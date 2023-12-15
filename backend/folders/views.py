from django.shortcuts import get_object_or_404
from rest_framework import viewsets,permissions, request
from .models import Folder
from projects.models import Project
from .serializers import FolderSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Folder.objects.filter(parent_project__owner=self.request.user)
        project_id = self.request.query_params.get('project_id')
        if project_id is not None:
            queryset = queryset.filter(parent_project_id=project_id)
        return queryset

    def perform_create(self, serializer):
        parent_project = get_object_or_404(Project, pk=self.request.data.get('parent_project'))
        if parent_project.owner != self.request.user:
            raise PermissionDenied({'message': "You don't have permission to add to this project"})
        serializer.save(parent_project=parent_project)
   

class FolderSearch(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('folder_name')
        if query:
            queryset = Folder.objects.filter(name__icontains=query)
            serializer = FolderSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message": "No search term provided"}, status=400)