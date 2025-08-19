from rest_framework import serializers
from .models import UserProfileModel
from django.contrib.auth.password_validation import validate_password


class UserProfileSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = UserProfileModel
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_Number', 'image', 'address', 'password', 'password2']
        
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'username':{'required':True},
            'email':{'required':True},
            'password':{'write_only':True},
        }
    
    def validate(self, attrs):
        password = attrs.get('password')
        
        if password != attrs.get("password2"):
            raise serializers.ValidationError({"Password: Password did not match"})
        validate_password(password)
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.get("password")
        
        user = UserProfileModel.objects.create_user(**validated_data)
        user.set_password(password)
        user.save
        return user