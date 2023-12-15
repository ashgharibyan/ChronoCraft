from django.urls import path, include
from .views import TaskViewSet, TaskSearch
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', TaskViewSet)

urlpatterns = [
    path('search/', TaskSearch.as_view(), name="task-search"),
    path('', include(router.urls)),
]