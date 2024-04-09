from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.cache import cache

# from management_app.base.models import *
from . models import Product1
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

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

@api_view(['GET'])
def view_cached_books(request):
    if 'product' in cache:
        # get results from cache 
        products = cache.get('product')
        print('hit the cache')
        return Response(products, status=status.HTTP_201_CREATED)
    else:
        products = Product1.objects.all()
        results = [product.to_json() for product in products]
        # store data in cache 
        cache.set(products, results, timeout=CACHE_TTL)
        print('F')
        return Response(results, status=status.HTTP_201_CREATED)