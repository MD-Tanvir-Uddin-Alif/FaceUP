from django.contrib import admin
from .models import UserProfileModel
# Register your models here.


@admin.register(UserProfileModel)
class UserProfileadmin(admin.ModelAdmin):
    model = UserProfileModel
    list_display = ('id','username', 'email')
    search_fields =  ('email', 'username',)
    
