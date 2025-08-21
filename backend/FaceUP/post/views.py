from django.shortcuts import render
from django.core.cache import cache

from .models import PostModel
from .serializers import PostSerializer


from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class PostCreateView(CreateAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)



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
    queryset = PostModel
    