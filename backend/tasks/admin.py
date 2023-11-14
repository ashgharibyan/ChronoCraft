from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ('id', 'name', 'parent_list', 'description', 'completed', 'high_priority', 'due_date', 'created_at', 'updated_at')

admin.site.register(Task, TaskAdmin)