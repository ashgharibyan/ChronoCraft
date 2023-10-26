from .models import CustomUser
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .validators import validate_email


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'name')


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta:
        model = CustomUser
        fields = UserDetailsSerializer.Meta.fields + ('name',)


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length=150,error_messages={
            'max_length': 'Name is too long.(Maximun 150 characters)',
        })
    email = serializers.EmailField(validators=[validate_email])

    def get_cleaned_data(self):
        super_cleaned_data = super().get_cleaned_data()
        return {
            **super_cleaned_data,
            'name': self.validated_data.get('name', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        user = super().save(request)
        user.name = self.cleaned_data.get('name')
        user.email = self.cleaned_data.get('email')
        user.save()
        return user
