from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_api, name='test-api'),
    path('contact/', views.contact_create, name='contact-create'),
] 