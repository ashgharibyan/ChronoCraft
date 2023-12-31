from rest_framework import viewsets
from rest_framework import permissions
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAdminUser
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response
from rest_framework.views import APIView
from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model
from rest_framework import status
from allauth.account.utils import send_email_confirmation
from rest_framework import serializers
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model

def is_email_verified(user):
    return EmailAddress.objects.filter(user=user, verified=True).exists()

class DeleteUserView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('pk')

        if not user_id:
            return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the user model using the user_id from request.data
            user = get_user_model().objects.get(id=user_id)
            user.delete()
            return Response({"deleted": True}, status=status.HTTP_200_OK)
        except get_user_model().DoesNotExist:
            # Handle the case where the user does not exist
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class IsEmailVerified(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')

        if not user_id:
            return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the user model using the user_id from request.data
            user = get_user_model().objects.get(id=user_id)
            if is_email_verified(user):
                return Response({"verified": True}, status=status.HTTP_200_OK)
            else:
                return Response({"verified": False}, status=status.HTTP_200_OK)
        except get_user_model().DoesNotExist:
            # Handle the case where the user does not exist
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = CustomUser.objects.all().order_by("-date_joined")
    serializer_class = CustomUserSerializer
    permission_classes = [IsOwnerOrReadOnly]


    

    def partial_update(self, request, *args, **kwargs):

        user = self.get_object()
        original_email = user.email  
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        # Perform update
        user = serializer.save()

        # If the email was updated, send a confirmation email
        if 'email' in serializer.validated_data and original_email != serializer.validated_data['email']:
            new_email = serializer.validated_data['email']
            email_address, created = EmailAddress.objects.get_or_create(
                user=user, defaults={'email': new_email, 'primary': True, 'verified': False}
            )

            if not created:
                email_address.email = new_email
                email_address.primary = True
                email_address.verified = False
                email_address.save()
  
            send_email_confirmation(request, user, signup=False, email=user.email)

        return Response(serializer.data)
    


class CustomRegisterView(RegisterView):
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        if response.status_code == 201:  # HTTP 201 Created
            # Set refresh token in HttpOnly cookie and exclude it from the body
            # print(response.data)
            refresh_token = response.data.pop("refresh", None)
            if refresh_token:
                response.set_cookie(
                    "refresh", refresh_token, httponly=True, secure=True
                )

        return response


