from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
# Create your models here.


class UserProfileModel(AbstractUser):
    phone_number = models.CharField(max_length=11)
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.username}"


class FriendRequset(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    from_user = models.ForeignKey(UserProfileModel, on_delete=models.CASCADE, related_name='sent_friend_request')
    to_user = models.ForeignKey(UserProfileModel, on_delete=models.CASCADE, related_name='received_friend_request')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('from_user', 'to_user')
        ordering = ['-created_at']
    
    def clean(self):
        if self.from_user == self.to_user:
            raise ValidationError("User cannot send friend request to themselves")
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username} ({self.status})"