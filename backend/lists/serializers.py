from rest_framework import serializers
from .models import List
from folders.models import Folder

class ListSerializer(serializers.ModelSerializer):
    # parent_folder = serializers.ReadOnlyField(source='parent_folder.pk')
    parent_project_id = serializers.SerializerMethodField()

    class Meta:
        model = List
        fields = ["id", "name", "parent_folder","parent_project_id", "created_at", "updated_at"]

    def __init__(self, *args, **kwargs):
        super(ListSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and hasattr(request, "user"):
            self.fields['parent_folder'].queryset = Folder.objects.filter(parent_project__owner=request.user)

    def get_parent_project_id(self, obj):
        return obj.parent_folder.parent_project.id