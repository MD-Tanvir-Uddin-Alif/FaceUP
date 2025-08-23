from django.shortcuts import render
from django.core.cache import cache

from .models import PostModel, CommentModel
from .serializers import PostSerializer, CommentSerializer


from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.


class PostCreateView(CreateAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        cache_key = f"user_post_list{self.request.user.id}"
        cache.delete(cache_key)



class UserPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cache_key = f"user_post_list{self.request.user.id}"
        post = cache.get(cache_key)
        
        if post is None:
            post = PostModel.objects.filter(author=self.request.user)
            cache.set(cache_key, post, timeout=60)
        return post


class UserPostUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        instence = serializer.save()
        cache_key = f"user_post_list{instence.author.id}"
        cache.delete(cache_key)

    def perform_destroy(self, instance):
        cache_key = f"user_post_list{instance.author.id}"
        cache.delete(cache_key)
        instance.delete()


class PostListView(ListAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]


class CommentCreatedView(CreateAPIView):
    queryset = CommentModel
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        post_id = self.kwargs["post_id"]
        return serializer.save(author=self.request.user, post_id=post_id)