from django.db import models
from Profile.models import UserProfileModel
# Create your models here.


class PostModel(models.Model):
    author = models.ForeignKey(UserProfileModel, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField('post/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.author.username}"