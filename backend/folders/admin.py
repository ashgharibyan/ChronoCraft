from django.contrib import admin
from .models import Folder

class FolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent_project', "created_at", "updated_at")
    model = Folder

admin.site.register(Folder, FolderAdmin)
