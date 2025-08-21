from django.urls import path
from .views import PostCreateView, UserPostListView


urlpatterns = [
    path('create/', PostCreateView.as_view(), name='create_post'),
    path('user/', UserPostListView.as_view(), name='user_post')
]
