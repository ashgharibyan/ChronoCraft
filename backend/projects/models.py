from django.db import models
from django.contrib.auth import get_user_model


class Project(models.Model):
    owner= models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='projects')
    description = models.TextField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=120, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} by {self.owner}"
