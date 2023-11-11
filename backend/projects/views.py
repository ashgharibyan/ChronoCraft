from django.shortcuts import render
from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import viewsets, permissions

# class ProjectList(generics.ListAPIView):
#     queryset= Project.objects.all()
#     serializer_class = ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(owner=user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)