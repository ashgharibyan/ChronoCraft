from django.shortcuts import get_object_or_404
from rest_framework import viewsets,permissions
from .models import Folder
from projects.models import Project
from .serializers import FolderSerializer
from .permissions import IsOwnerOfParentProject

class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfParentProject]

    def get_queryset(self):
        # Filter queryset to include only folders of projects owned by the current user
        return Folder.objects.filter(parent_project__owner=self.request.user)

    def perform_create(self, serializer):
        # The parent_project should be passed from the request during creation
        # Ensure that the parent_project is owned by the current user
        parent_project_id = self.request.data.get('parent_project')
        parent_project = get_object_or_404(Project, pk=parent_project_id, owner=self.request.user)
        serializer.save(parent_project=parent_project)
        
    # def get_queryset(self):
    #     queryset = Folder.objects.filter(parent_project__owner=self.request.user)
    #     project_id = self.request.query_params.get('project_id')
    #     if project_id is not None:
    #         queryset = queryset.filter(parent_project_id=project_id)
    #     return queryset

    # def perform_create(self, serializer):
    #     parent_project = get_object_or_404(Project, pk=self.request.data.get('parent_project'))
    #     serializer.save(parent_project=parent_project)

    # def get_serializer_context(self):
    #     context = super(FolderViewSet, self).get_serializer_context()
    #     if 'view' in context and context['view'].action in ['create', 'update']:
    #         # Set the queryset for the 'parent_project' field to only include projects owned by the current user
    #         context['serializer'].fields['parent_project'].queryset = Project.objects.filter(owner=context['request'].user)
    #     return context
