from rest_framework import serializers
from .models import PostModel


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = PostModel
        fields = ['id', 'author', 'content', 'image', 'created_at', 'updated_at']
