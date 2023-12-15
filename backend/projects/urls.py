from django.urls import path, include
from .views import ProjectViewSet, ProjectSearch
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', ProjectViewSet)


urlpatterns = [
    path('search/', ProjectSearch.as_view(), name="project-search"),
    path('', include(router.urls)),
]