from rest_framework import serializers
from .models import PostModel, CommentModel


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = PostModel
        fields = ['id', 'author', 'content', 'image', 'created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = CommentModel
        fields = ['id', 'post', 'author', 'created_at']
        read_only_fields = ['author', 'created_at']