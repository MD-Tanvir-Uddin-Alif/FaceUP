from django.urls import path
from .views import UserProfileCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('registration/',UserProfileCreateView.as_view(), name="user_registration"),
    path('login/', TokenObtainPairView.as_view(), name="user_login"),
]