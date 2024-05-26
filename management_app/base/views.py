from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from django.db.models import Max
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from django.contrib.auth.models import User
import jwt, datetime
from django.db import models

from email import *
from django.db import connection

from .serializers import CartSerializer,UserSerializer,OrderSerializer

from . models import Cart, Product1, User, Order, Admin, OrderFE

connect_sql = connection.cursor()

# api user
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        if isinstance(token, bytes):
            token = token.decode('utf-8')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

# api product
@api_view(['GET'])
def products(request):
    api_urls = {
        'List': '/product_list',
        'Detail': '/product_detail',
        'Delete': '/product_delete',
        'Update': '/product_update',
        'Search': '/product_search',
        'Create': '/product_create',
    }
    return Response(api_urls,status=status.HTTP_200_OK)

@api_view(['GET'])
def product_list(request):
    products = Product1.objects.using('mongodb').all()
    results = [product.to_json() for product in products]
    return Response(results, status=status.HTTP_200_OK)

@api_view(['POST'])
def product_detail(request):
    product_id = request.data.get('product_id', None)
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    result = product.to_json()
    return Response(result, status=status.HTTP_200_OK)
    # {
    #     "product_id": 1
    # }

@api_view(['POST'])
def product_delete(request):
    product_id = request.data.get('product_id', None)
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.delete(using='mongodb')

    return Response(status=status.HTTP_200_OK)
    # {
    #     "product_id": 1
    # }

@api_view(['POST'])
def product_update(request):
    product_id = request.data.get('product_id', None)
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.name = request.data.get('name', product.name)
    product.category = request.data.get('category', product.category)
    product.price = request.data.get('price', product.price)
    product.stars = request.data.get('stars', product.stars)
    product.description = request.data.get('desc', product.description)
    product.url = request.data.get('url', product.url)
    product.product_count = request.data.get('product_count', product.product_count)
    product.date_modified = models.DateTimeField(auto_now=True, blank=True)
    product.save(using='mongodb')

    return Response(product.to_json(), status=status.HTTP_200_OK)
    # {
    #     "product_id": 1,
    #     "name": "",
    #     "category": "",
    #     "price": 100,
    #     "stars": 4.5,
    #     "desc": "",
    #     "product_count": 1,
    #     "url": ""
    # }

@api_view(['POST'])
def product_search(request):
    product_search = request.data.get('product_search', None)
    products = Product1.objects.using('mongodb').all()
    results = [product.to_json() for product in products]

    if not product_search:
        return Response(results, status=status.HTTP_200_OK)

    product_name = product_search.get('name', None)
    product_category = product_search.get('category', None)
    min_price = product_search.get('min_price', None)
    max_price = product_search.get('max_price', None)
    filtered_results = []

    for product in results:
        if product_name and product_name.lower() not in product['name'].lower():
            continue
        if product_category and product_category.lower() != product['category'].lower():
            continue
        if min_price is not None and min_price != '' and product['price'] < float(min_price):
            continue
        if max_price is not None and max_price != '' and product['price'] > float(max_price):
            continue
        filtered_results.append(product)

    return Response(filtered_results, status=status.HTTP_200_OK)
    # {
    #     "product_search": {
    #         "name": "",
    #         "category": "",
    #         "min_price": 0,
    #         "max_price": 9000000
    #     }
    # }

@api_view(['POST'])
def product_create(request):
    max_id = Product1.objects.using('mongodb').all().aggregate(Max('product_id'))['product_id__max']
    next_id = max_id + 1 if max_id else 1

    product = Product1(
        product_id=next_id,
        name=request.data.get('name'),
        category=request.data.get('category'),
        price=request.data.get('price'),
        stars=request.data.get('stars'),
        description=request.data.get('description'),
        url=request.data.get('url'),
        product_count=request.data.get('product_count'),
    )

    product.save(using='mongodb')
    return Response(product.to_json(), status=status.HTTP_201_CREATED)
    # {
    #     "name": "",
    #     "category": "",
    #     "price": 100000,
    #     "stars": 4.5,
    #     "description": "",
    #     "url": "",
    #     "product_count": 1
    # }

# api admin
@api_view(['GET'])
def admins(request):
    api_urls = {
        'List': '/admin_list',
        'Detail': '/admin_detail',
        'Update': '/admin_update',
        'Create': '/admin_create',
        'Delete': '/admin_delete',
        'Search': '/admin_search',
    }
    return Response(api_urls, status=status.HTTP_200_OK)

@api_view(['GET'])
def admin_list(request):
    admins = Admin.objects.using('mongodb').all()
    results = [admin.to_json() for admin in admins]
    return Response(results, status=status.HTTP_200_OK)

@api_view(['POST'])
def admin_detail(request):
    admin_username = request.data.get('admin_username', None)
    try:
        admin = Admin.objects.using('mongodb').get(admin_username=admin_username)
    except Admin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    result = admin.to_json()
    return Response(result, status=status.HTTP_200_OK)
    # {
    #     "admin_username": 1
    # }

@api_view(['POST'])
def admin_update(request):
    admin_username = request.data.get('username', None)
    try:
        admin = Admin.objects.using('mongodb').get(admin_username=admin_username)
    except Admin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    admin.admin_username = request.data.get('username', admin.admin_username)
    admin.admin_name = request.data.get('name', admin.admin_name)
    admin.admin_email = request.data.get('email', admin.admin_email)
    admin.admin_address = request.data.get('address', admin.admin_address)
    admin.admin_phonenumber = request.data.get('phone', admin.admin_phonenumber)
    admin.admin_gender = request.data.get('gender', admin.admin_gender)
    admin.save(using='mongodb')

    return Response(admin.to_json(), status=status.HTTP_200_OK)
    # {
    #     "username": "",
    #     "name": "",
    #     "email": "",
    #     "address": "",
    #     "phone": "",
    #     "gender": ""
    # }

@api_view(['POST'])
def admin_create(request):
    max_id = Admin.objects.using('mongodb').all().aggregate(Max('admin_id'))['admin_id__max']
    next_id = max_id + 1 if max_id else 1

    admin = Admin(
        admin_id=next_id,
        admin_username=request.data.get('username'),
        admin_name=request.data.get('name'),
        admin_email=request.data.get('email'),
        admin_address=request.data.get('address'),
        admin_phonenumber=request.data.get('phone'),
        admin_gender=request.data.get('gender'),
    )

    admin.save(using='mongodb')
    return Response(admin.to_json(), status=status.HTTP_201_CREATED)
    # {
    #     "username": "",
    #     "name": "",
    #     "email": "",
    #     "address": "",
    #     "phone": "",
    #     "gender": ""
    # }

@api_view(['POST'])
def admin_delete(request):
    admin_username = request.data.get('admin_username', None)
    try:
        admin = Admin.objects.using('mongodb').get(admin_username=admin_username)
    except Admin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    admin.delete(using='mongodb')

    return Response(status=status.HTTP_200_OK)
    # {
    #     "admin_username": 1
    # }

@api_view(['POST'])
def admin_search(request):
    admin_name = request.data.get('name', None)
    if not admin_name:
        admins = Admin.objects.using('mongodb').all()
        results = [admin.to_json() for admin in admins]
        return Response(results, status=status.HTTP_200_OK)
    admins = Admin.objects.using('mongodb').filter(admin_name__icontains=admin_name)
    results = [admin.to_json() for admin in admins]
    return Response(results, status=status.HTTP_200_OK)
    # {
    #     "name": ""
    # }

# api order
@api_view(['GET'])
def orders(request):
    api_urls = {
        'List': '/order_list',
        'Create': '/order_create',
        'Update': '/order_update',
        'Delete': '/order_delete',
    }
    return Response(api_urls, status=status.HTTP_200_OK)

@api_view(['GET'])
def order_list(request):
    orders = OrderFE.objects.using('mongodb').all()
    results = [order.to_json() for order in orders]
    return Response(results, status=status.HTTP_200_OK)

@api_view(['POST'])
def order_create(request):
    order = OrderFE(
        id_number=request.data.get('id_number'),
        total_amount=request.data.get('total_amount'),
        product=request.data.get('product'),
        name=request.data.get('name'),
        phone=request.data.get('phone'),
        address=request.data.get('address'),
        status=request.data.get('status'),
        note=request.data.get('note'),
    )
    order.save(using='mongodb')
    return Response(order.to_json(), status=status.HTTP_201_CREATED)
    # {
    #     "id_number": 1,
    #     "total_amount": 100000,
    #     "product": "",
    #     "name": "",
    #     "phone": "",
    #     "address": "",
    #     "status": "",
    #     "note": ""
    # }

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def order_detail(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['PUT'])
def update_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


#giỏ hàng.
@api_view(['GET', 'POST'])
def cart_list(request):
    if request.method == 'GET':
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#user
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET': # lấy danh sách tất cả người dùng
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST': #Tạo người dùng mới
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': # Lấy thông tin 1 người dùng 
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT': # Cập nhập
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': #xóa 
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
