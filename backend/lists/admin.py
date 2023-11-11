from django.contrib import admin
from .models import List

class ListAdmin(admin.ModelAdmin):
    model = List
    list_display=('id', 'name', 'parent_folder', 'created_at', 'updated_at')

admin.site.register(List, ListAdmin)
