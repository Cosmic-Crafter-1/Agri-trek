from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Custom user model for Agri-Trekker"""
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    is_farmer = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Make email the required field for login instead of username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Email & password are required by default

    def __str__(self):
        return self.email
