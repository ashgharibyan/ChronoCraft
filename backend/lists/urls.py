from django.urls import path, include
from .views import ListViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', ListViewset)

urlpatterns = [
    path('', include(router.urls)),
]