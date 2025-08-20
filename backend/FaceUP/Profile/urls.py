from django.urls import path
from .views import UserProfileCreateView


urlpatterns = [
    path('registration/',UserProfileCreateView.as_view(), name="user_registration"),
]
