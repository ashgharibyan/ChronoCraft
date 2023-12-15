from django.urls import path, include
from .views import FolderViewSet, FolderSearch
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', FolderViewSet)

urlpatterns = [
    path('search/', FolderSearch.as_view(), name="folder-search"),
    path("", include(router.urls)),
]