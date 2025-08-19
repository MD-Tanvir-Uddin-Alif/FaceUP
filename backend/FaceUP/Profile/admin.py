from django.contrib import admin
from .models import UserProfilrModel
# Register your models here.


@admin.register(UserProfilrModel)
class UserProfileadmin(admin.ModelAdmin):
    model = UserProfilrModel
    list_display = ('id','username', 'email')
    search_fields =  ('email', 'username',)
    
