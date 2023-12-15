from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, request
from .models import List
from folders.models import Folder
from projects.models import Project
from .serializers import ListSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

class ListViewset(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = List.objects.filter(parent_folder__parent_project__owner=self.request.user)
        folder_id = self.request.query_params.get('folder_id')
        if folder_id is not None:
            queryset = queryset.filter(parent_folder_id=folder_id)
        return queryset
    
    def perform_create(self, serializer):
        parent_folder = get_object_or_404(Folder, pk=self.request.data.get('parent_folder'))
        parent_project = parent_folder.parent_project
        if parent_project.owner != self.request.user:
            raise PermissionDenied({'message': "You don't have permission to add to this folder"})
        serializer.save(parent_folder=parent_folder)

class ListSearch(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('list_name')
        if query:
            queryset = List.objects.filter(name__icontains=query)
            serializer = ListSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message": "No search term provided"}, status=400)
    