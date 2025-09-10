from django.contrib import admin
from .models import UserProfileModel, FriendRequset
# Register your models here.


@admin.register(UserProfileModel)
class UserProfileadmin(admin.ModelAdmin):
    model = UserProfileModel
    list_display = ('id','username', 'email')
    search_fields =  ('email', 'username',)


@admin.register(FriendRequset)
class FrinedRequestAsmin(admin.ModelAdmin):
    model = FriendRequset
    list_display = ('id', 'from_user', 'to_user', 'created_at', 'updated_at')
    search_fields = ('from_user', 'to_user')