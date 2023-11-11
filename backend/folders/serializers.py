from rest_framework import serializers
from .models import Folder

class FolderSerializer(serializers.ModelSerializer):
    parent_project = serializers.ReadOnlyField(source='parent_project.pk')

    class Meta:
        model = Folder
        fields = ['id', 'name', 'parent_project', 'created_at', 'updated_at']
