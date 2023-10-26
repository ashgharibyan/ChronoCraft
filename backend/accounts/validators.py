from django.core.exceptions import ValidationError
from .models import CustomUser

def validate_email(value):
    if CustomUser.objects.filter(email = value).exists():
        raise ValidationError(
            ("Email is taken. Please try another one."),
            params = {'value':value}
        )
