from rest_framework import serializers
from .models import UserProfileModel, FriendRequset
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


User = get_user_model()


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
    
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     print("Serializer fields:", self.Meta.fields) 
    
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


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserProfileSerializer(read_only=True)
    to_user = UserProfileSerializer(read_only=True)
    to_user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model =FriendRequset
        fields = ['id', 'from_user', 'to_user', 'to_user_id',  'status', 'created_at']
        read_only_fields = ['from_user', 'status', 'created_at']
    
    def validate_to_user_id(self, value):
        try:
            to_user = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")
        
        from_user = self.context['request'].user
        
        if from_user.id == value:
            raise serializers.ValidationError("You cannot send a friend request to yourself.")
        
        if FriendRequset.objects.filter(from_user=from_user, to_user=to_user).exists():
            raise serializers.ValidationError("Friend request already sent.")
        
        if FriendRequset.objects.filter(from_user=to_user, to_user=from_user, status='pending').exists():
            raise serializers.ValidationError("This user has already sent you a friend request.")
        
        return value
    
    def create(self, validated_data):
        to_user_id = validated_data.pop('to_user_id')
        to_user = User.objects.get(id=to_user_id)
        validated_data['to_user'] = to_user
        validated_data['from_user'] = self.context['request'].user
        return super().create(validated_data)