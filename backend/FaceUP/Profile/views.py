from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.core.cache import cache
from .models import UserProfileModel, FriendRequestModel
from .serializers import UserProfileSerializer, UserProfileRegistrationSerializer, FriendRequestSerializer, FriendshipSerializer
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView, UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

Profile = get_user_model()

class UserProfileCreateView(CreateAPIView):
    queryset = UserProfileModel.objects.all()
    serializer_class = UserProfileRegistrationSerializer
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



class FriendRequestSendView(CreateAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Friend request sent successfully.",
                "data": serializer.data
                },status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PendingFriendRequestView(ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return FriendRequestModel.objects.filter(to_user=self.request.user, status='pending')


class RejectFriendRequestView(UpdateAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def get_queryset(self):
        return FriendRequestModel.objects.filter(
            to_user=self.request.user,
            status='pending'
        )
    
    def update(self, request, *args, **kwargs):
        try:
            friend_request = self.get_object()
            
            friend_request.status = 'rejected'
            friend_request.save()
            
            return Response(
                {"message": "Friend request rejected successfully."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )