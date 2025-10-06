from django.urls import path
from .views import UserProfileCreateView, LogoutView, UserProfileView, FriendRequestSendView, PendingFriendRequestView, RejectFriendRequestView, AcceptFriendRequestView, CancelFriendRequestView, FriendListView, RemoveFriend, AllUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    # user url
    path('registration/',UserProfileCreateView.as_view(), name="user_registration"),
    path('login/', TokenObtainPairView.as_view(), name="user_login"),
    path('refresh-token/', TokenRefreshView.as_view(), name="refresh_token"),
    path('logout/', LogoutView.as_view(), name="user_logout"),
    path('info/', UserProfileView.as_view(), name="User_info_Update"),
    
    
    # Friend url
    
    path('friend-request/send/', FriendRequestSendView.as_view(), name="user_send_friend_request"),
    path('friend-request/pending/', PendingFriendRequestView.as_view(), name="user_pending_friend_requests"),
    path('friend-request/<int:pk>/reject/', RejectFriendRequestView.as_view(), name="user_reject_friend_requests"),
    path('friend-request/<int:pk>/accept/', AcceptFriendRequestView.as_view(), name="user_accept_friend_requests"),
    path('friend-request/<int:pk>/cancel/', CancelFriendRequestView.as_view(), name="user_cancel_friend_requests"),
    path('friends/', FriendListView.as_view(), name="user_friendlist"),
    path('friend/<int:pk>/remove/', RemoveFriend.as_view(), name="user_friend_remove"),
    
    
    path('all-user/', AllUserView.as_view(), name='get all the user')
]