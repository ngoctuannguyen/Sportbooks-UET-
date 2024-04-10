from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.cache import cache
from email import *
from django.db import connection    

# from management_app.base.models import *
from . models import Product1
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

connect_sql = connection.cursor()

@api_view(['GET'])
# Create your views here.
def view_product_detail(request):
    api_urls = {
        'List': '/product-list/',
        'Detail View': '/product-detail/<int:id>',
        'Create': '/product-create/',
        'Update': '/product-update/<int:id>',
        'Delete': '/product-detail/<int:id>'
    }
    return Response(api_urls,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_products(request):
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
    
# @api_view(['GET'])
# def view_product(request):
# # Tìm kiếm sản phẩm theo tên, danh mục, giá cả, v.v.
# # Lọc sản phẩm theo thương hiệu, màu sắc, kích thước, v.v.


# @api_view(['POST'])
# Thêm sản phẩm mới.
def view_insert_product(request, 
                        name,
                        category,
                        price,
                        star='',
                        description='',
                        date_created=''):
    product = Product1(name, category, price, star, description, description, date_created)
    product.save()
    return Response(product.to_json, status=status.HTTP_201_CREATED)

@api_view('POST')
def view_delete_product(request, name):
    product = Product1.objects.get(name=name)
    product.delete()

@api_view(['GET'])
def view_remaining_product(request):
    product = Product1.objects.raw('select * from ... \
                                   where count > 0')
    return Response(product.to_json(), status=status.HTTP_202_ACCEPTED)

