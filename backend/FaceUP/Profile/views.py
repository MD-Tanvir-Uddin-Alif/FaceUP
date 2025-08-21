from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.core.cache import cache
from .models import UserProfileModel
from .serializers import UserProfileSerializer
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

Profile = get_user_model()

class UserProfileCreateView(CreateAPIView):
    queryset = UserProfileModel.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(RetrieveUpdateAPIView):
    queryset = UserProfileModel
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        cache_key = f"user_profile_{user.id}"
        
        profile = cache.get(cache_key)
        if profile is not None:
            return profile
        profile = user
        cache.set(cache_key, profile, timeout=60)
        return profile

    def perform_update(self, serializer):
        instence = serializer.save()
        cache_key = f"user_profile_{instence.id}"
        cache.set(cache_key, instence, timeout=60)
        return instence
        