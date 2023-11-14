from rest_framework import serializers
from .models import Folder
from projects.models import Project

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['id', 'name', 'parent_project', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super(FolderSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and hasattr(request, "user"):
            self.fields['parent_project'].queryset = Project.objects.filter(owner=request.user)
            

