from django.shortcuts import render
from rest_framework import generics, request
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


# class ProjectList(generics.ListAPIView):
#     queryset= Project.objects.all()
#     serializer_class = ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectSearch(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('project_title')
        if query:
            queryset = Project.objects.filter(title__icontains=query)
            serializer = ProjectSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message": "No search term provided"}, status=400)
    