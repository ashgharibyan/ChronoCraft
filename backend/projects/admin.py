from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title','description','owner','created_at','updated_at')
    model = Project


admin.site.register(Project, ProjectAdmin)