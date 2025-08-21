from django.urls import path
from .views import UserProfileCreateView, LogoutView, UserProfileView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('registration/',UserProfileCreateView.as_view(), name="user_registration"),
    path('login/', TokenObtainPairView.as_view(), name="user_login"),
    path('refresh-token/', TokenRefreshView.as_view(), name="refresh_token"),
    path('logout/', LogoutView.as_view(), name="user_logout"),
    path('info/', UserProfileView.as_view(), name="User_info_Update"),
]