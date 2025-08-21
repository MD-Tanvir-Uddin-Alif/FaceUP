from django.urls import path
from .views import PostCreateView, UserPostListView, UserPostUpdateDeleteView, PostListView


urlpatterns = [
    path('create/', PostCreateView.as_view(), name='create_post'),
    path('user/', UserPostListView.as_view(), name='user_post'),
    path('info/<int:pk>/', UserPostUpdateDeleteView.as_view(), name='user_post_update_delete'),
    path('all/', PostListView.as_view(), name='all_post')
]
