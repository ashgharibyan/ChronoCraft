from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from .models import List
from folders.models import Folder
from .serializers import ListSerializer


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
        serializer.save(parent_folder=parent_folder)
