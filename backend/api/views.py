from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
import logging

logger = logging.getLogger(__name__)

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def test_api(request):
    return Response({
        "message": "API is working!",
        "status": "success"
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_create(request):
    try:
        logger.info(f"Received contact form data: {request.data}")
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Creates a new Contact object in the database
            serializer.save()
            return Response({
                "message": "Message sent successfully!",
                "status": "success",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        logger.error(f"Validation errors: {serializer.errors}")
        return Response({
            "message": "Invalid data",
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Error processing contact form submission")
        return Response({
            "message": "An error occurred while processing your request",
            "status": "error",
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
