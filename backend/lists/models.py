from django.db import models
from folders.models import Folder

class List(models.Model):
    name = models.CharField(max_length=100)
    parent_folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="lists")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name