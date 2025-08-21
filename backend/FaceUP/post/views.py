from django.shortcuts import render


from .models import PostModel
from .serializers import PostSerializer


from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class PostCreateView(CreateAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)