from django.urls import path, include
from .views import ProjectViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', ProjectViewSet)


urlpatterns = [
    path('', include(router.urls)),
]