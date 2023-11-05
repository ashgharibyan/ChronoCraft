from django.urls import include, path
from rest_framework import routers
from .views import CustomUserViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from dj_rest_auth.views import PasswordResetConfirmView
from .views import CustomRegisterView, IsEmailVerified

router = routers.DefaultRouter()
router.register(r"users", CustomUserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("is-email-verified/", IsEmailVerified.as_view(), name="is-email-verified"),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path(
        "dj-rest-auth/registration/", CustomRegisterView.as_view(), name="rest_register"
    ),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/registration/verify-email/", include("dj_rest_auth.registration.urls"), name='rest_verify_email'),
    path(
        "dj-rest-auth/password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]
