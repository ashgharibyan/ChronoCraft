"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include("accounts.urls"), name="accounts"),
    path('api/v1/core/', include("core.urls"), name="core"),
    path('api/v1/projects/', include("projects.urls"), name="projects"),
    path('api/v1/folders/', include("folders.urls"), name="folders"),
    path('api/v1/lists/', include("lists.urls"), name="lists"),
    path('api/v1/tasks/', include("tasks.urls"), name="tasks"),
]