from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(null=True, blank=True, max_length=150)
    email = models.EmailField(unique=True, blank=False, null=False)
    
    def __str__(self):
        return self.username