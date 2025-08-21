from django.contrib import admin
from .models import PostModel
# Register your models here.


@admin.register(PostModel)
class PostModelAdmin(admin.ModelAdmin):
    model = PostModel
    list_display = ('id', 'author', 'created_at', 'updated_at')