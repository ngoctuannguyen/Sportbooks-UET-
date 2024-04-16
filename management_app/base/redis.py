from datetime import time
import math
import uuid
# from django_redis import get_redis_connection
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from django.views.decorators.cache import cache_page
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.cache import cache
from . models import Product1
from rest_framework import status
# from .models import UserProfile

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

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

# def create_user(request):
#     user = get_user_model().objects.create(
#         username=request.POST['username'], password=request.POST['password']
#     )
#     profile = UserProfile.objects.create(user=user, bio=request.POST['bio'], website=request.POST['website'])
#     profile.save()
#     return user

# @api_view(['GET'])
@cache_page(60 * 15)
def cached(request):
    user_model = get_user_model()
    all_users = user_model.objects.all()
    return Response(cache)

@api_view(['GET'])
def cacheless(request):
    user_model = get_user_model()
    all_users = user_model.objects.all()
    return Response(len(all_users))