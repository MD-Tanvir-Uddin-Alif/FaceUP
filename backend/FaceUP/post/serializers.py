from rest_framework import serializers
from .models import PostModel, CommentModel, LikeModel


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = CommentModel
        fields = ['id', 'post', 'author', 'content', 'created_at']
        read_only_fields = ['post','author', 'created_at']


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = LikeModel
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['user', 'post', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True,read_only=True)
    class Meta:
        model = PostModel
        fields = ['id', 'author', 'content', 'image', 'comments','created_at', 'updated_at']
