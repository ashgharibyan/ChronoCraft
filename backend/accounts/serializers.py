from .models import CustomUser
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .validators import validate_email


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'name')
        extra_kwargs = {
            'email' : {'read_only': False},
        }
    
    def validate_username(self, value):
        print("inside validate_username")
        # If the instance (user being updated) has the same username, it's fine
        if self.instance and self.instance.username == value:
            return value
        # Check if a different user has the same username
        if CustomUser.objects.exclude(pk=self.instance.pk).filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value


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
