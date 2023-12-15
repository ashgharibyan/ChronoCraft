from django.urls import path, include
from .views import ListViewset, ListSearch
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', ListViewset)

urlpatterns = [
    path('search/', ListSearch.as_view(), name="list-search"),
    path('', include(router.urls)),
]
