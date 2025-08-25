from rest_framework import serializers
from .models import UserProfileModel
from django.contrib.auth.password_validation import validate_password


class UserProfileRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = UserProfileModel
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'image', 'address', 'password', 'password2']
        
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'username':{'required':True},
            'email':{'required':True},
            'password':{'write_only':True},
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        print("Serializer fields:", self.Meta.fields) 
    
    def validate_username(self,value):
        if UserProfileModel.objects.filter(username=value):
            raise serializers.ValidationError("Username already exsits")
        return value
        
    
    def validate(self, attrs):
        password = attrs.get('password')
        
        if password != attrs.get("password2"):
            raise serializers.ValidationError({"password: Password did not match"})
        validate_password(password)
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.get("password")
        
        user = UserProfileModel.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileModel
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'image', 'address']
        read_only_fields = ['id', 'username']