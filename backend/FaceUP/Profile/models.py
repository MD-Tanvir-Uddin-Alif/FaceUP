from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class UserProfileModel(AbstractUser):
    phone_number = models.CharField(max_length=11)
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.username}"