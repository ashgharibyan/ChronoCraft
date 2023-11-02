# core/serializers.py

from rest_framework import serializers

class ContactFormSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    company = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    phone_number = serializers.IntegerField(required=True)
    message = serializers.CharField(required=True)
    agreed = serializers.BooleanField(required=True)
