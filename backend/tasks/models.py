from django.db import models
from lists.models import List

class Task(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    parent_list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="tasks")
    description = models.TextField(max_length=500)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(blank=True, null=True)
    high_priority = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __init__(self):
        return self.name

