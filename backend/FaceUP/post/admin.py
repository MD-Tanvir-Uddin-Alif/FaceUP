from django.contrib import admin
from .models import PostModel, CommentModel,LikeModel
# Register your models here.


@admin.register(PostModel)
class PostModelAdmin(admin.ModelAdmin):
    model = PostModel
    list_display = ('id', 'author', 'created_at', 'updated_at')


@admin.register(CommentModel)
class CommentModelAdmin(admin.ModelAdmin):
    model = CommentModel
    list_display = ('id', 'post', 'author', 'created_at')


@admin.register(LikeModel)
class LikeModelAdmin(admin.ModelAdmin):
    model = LikeModel
    list_display = ('id', 'user', 'post', 'created_at')