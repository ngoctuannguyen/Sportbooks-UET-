from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# from management_app.base.models import *
from . models import Product1

@api_view(['GET'])
# Create your views here.
def apiOverview(request):
    api_urls = {
        'List': '/product-list/',
        'Detail View': '/product-detail/<int:id>',
        'Create': '/product-create/',
        'Update': '/product-update/<int:id>',
        'Delete': '/product-detail/<int:id>'
    }
    return Response(api_urls,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_books(request):
    products = Product1.objects.all()
    results = [product.to_json() for product in products]
    return Response(results, status=status.HTTP_201_CREATED)