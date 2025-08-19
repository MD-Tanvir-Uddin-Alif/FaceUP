from rest_framework import serializers
from .models import UserProfilrModel


class UserProfileSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = UserProfilrModel
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_Number', 'image', 'address', 'password', 'password2']
        
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'username':{'required':True},
            'email':{'required':True},
            'password':{'write_only':True},
        }
    
    def validate(self, attrs):
        password = 