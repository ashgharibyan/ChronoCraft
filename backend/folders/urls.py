from django.urls import path, include
from .views import FolderViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', FolderViewSet)

urlpatterns = [
    path("", include(router.urls)),
]