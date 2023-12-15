from django.shortcuts import get_object_or_404
from .models import Task
from lists.models import List
from rest_framework import viewsets, permissions, request
from .serializers import TaskSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(parent_list__parent_folder__parent_project__owner = self.request.user)
        list_id = self.request.query_params.get('list_id')
        if list_id is not None:
            queryset = queryset.filter(parent_list_id=list_id)
        return queryset

    def perform_create(self, serializer):
        parent_list = get_object_or_404(List, pk = self.request.data.get('parent_list'))
        parent_project = parent_list.parent_folder.parent_project
        if parent_project.owner != self.request.user:
            raise PermissionDenied({'message': "You don't have permission to add to this list"})
        serializer.save(parent_list=parent_list)


class TaskSearch(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('task_name')
        if query:
            queryset = Task.objects.filter(name__icontains=query)
            serializer = TaskSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message": "No search term provided"}, status=400)
    