from django.shortcuts import render
from .models import UserProfileModel
from .serializers import UserProfileSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
# Create your views here.


class UserProfileCreateView(CreateAPIView):
    queryset = UserProfileModel
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]
