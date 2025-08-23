from django.urls import path
from .views import PostCreateView, UserPostListView, UserPostUpdateDeleteView, PostListView, CommentCreatedView, LikeDislikeView


urlpatterns = [
    path('create/', PostCreateView.as_view(), name='create_post'),
    path('user/', UserPostListView.as_view(), name='user_post'),
    path('info/<int:pk>/', UserPostUpdateDeleteView.as_view(), name='user_post_update_delete'),
    path('all/', PostListView.as_view(), name='all_post'),
    path('comment/<int:post_id>/', CommentCreatedView.as_view(), name='make_comment'),
    path('like/<int:post_id>/', LikeDislikeView.as_view(), name='like_post'),
]
