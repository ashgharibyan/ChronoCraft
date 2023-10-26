from rest_framework import viewsets
from rest_framework import permissions
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAdminUser
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response


class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = CustomUser.objects.all().order_by("-date_joined")
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]


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
