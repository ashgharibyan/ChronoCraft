from rest_framework import serializers
from .models import Task
from lists.models import List

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'parent_list', 'description', 'completed', 'high_priority', 'due_date', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super(TaskSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            self.fields['parent_list'].queryset = List.objects.filter(parent_folder__parent_project__owner = request.user)