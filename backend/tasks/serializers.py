from rest_framework import serializers
from .models import Task
from lists.models import List

class TaskSerializer(serializers.ModelSerializer):
    parent_folder_id = serializers.SerializerMethodField()
    parent_project_id = serializers.SerializerMethodField()


    class Meta:
        model = Task
        fields = ['id', 'name', 'parent_list', 'parent_folder_id', 'parent_project_id', 'description', 'completed', 'high_priority', 'due_date', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super(TaskSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            self.fields['parent_list'].queryset = List.objects.filter(parent_folder__parent_project__owner = request.user)

    def get_parent_project_id(self, obj):
        return obj.parent_list.parent_folder.parent_project.id
    
    def get_parent_folder_id(self, obj):
        return obj.parent_list.parent_folder.id