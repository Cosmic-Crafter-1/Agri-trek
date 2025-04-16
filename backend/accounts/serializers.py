from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone_number', 'address', 'is_farmer')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        help_text="Password must be at least 8 characters long and not too common."
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        help_text="Must match the password field."
    )

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'phone_number', 'address', 'is_farmer')
        extra_kwargs = {
            'email': {
                'required': True,
                'help_text': "A valid email address is required."
            },
            'username': {
                'required': True,
                'help_text': "Username must be unique and contain only letters, numbers, and @/./+/-/_ characters."
            },
            'phone_number': {
                'help_text': "Optional phone number."
            },
            'address': {
                'help_text': "Optional address."
            },
            'is_farmer': {
                'help_text': "Check this if you are registering as a farmer."
            }
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match. Please make sure both passwords are the same."
            })
        
        # Check if email already exists
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({
                "email": "A user with this email already exists. Please use a different email address."
            })
        
        # Check if username already exists
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({
                "username": "A user with this username already exists. Please choose a different username."
            })
        
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data 