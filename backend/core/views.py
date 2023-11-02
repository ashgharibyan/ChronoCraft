# core/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactFormSerializer
from django.core.mail import send_mail

class ContactFormAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data.get('first_name')
            last_name = serializer.validated_data.get('last_name')
            company = serializer.validated_data.get('company')
            email = serializer.validated_data.get('email')
            phone_number = serializer.validated_data.get('phone_number')
            message = serializer.validated_data.get('message')
            agreed = serializer.validated_data.get('agree')

            print("EMAIL CONTENT!!!")
            print(request.data)
            print("------------------")
            # Send email
            send_mail(
                subject=f"Message from {first_name} {last_name}",
                message=message,
                from_email=email,
                recipient_list=['your-email@example.com'],
                fail_silently=False,
            )

            return Response({"success": "Email sent successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
