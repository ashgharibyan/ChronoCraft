from django.urls import path
from .views import ContactFormAPIView

urlpatterns = [
    path('home/contact-form/', ContactFormAPIView.as_view(), name="home-contact-form"),
]