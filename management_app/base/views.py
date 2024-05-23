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

from email import *
from django.db import connection

from .serializers import CartSerializer,UserSerializer,OrderSerializer

from . models import Cart, Product1, User, Order

connect_sql = connection.cursor()

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

#api product
@api_view(['GET'])
def products(request):
    api_urls = {
        'List': '/product_list',
        'Search': '/product_search',
        'Detail': '/product_detail/<int:id>',
        'Create': '/product_create',
        'Update': '/product_update/<int:id>',
        'Delete': '/product_delete/<int:id>',
        'Inventory': '/product_inventory',
    }
    return Response(api_urls,status=status.HTTP_200_OK)

@api_view(['GET'])
def product_list(request):
    products = Product1.objects.using('mongodb').all()
    results = [product.to_json() for product in products]
    return Response(results, status=status.HTTP_200_OK)

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

@api_view(['GET'])
def product_detail(request, product_id):
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    result = product.to_json()
    return Response(result, status=status.HTTP_200_OK)

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
        product_count=request.data.get('product_count'),
    )
    # {
    #     "name": "Sample Product",
    #     "category": "Shoes",
    #     "price": 99.99,
    #     "stars": 5,
    #     "description": "This is a sample product.",
    #     "product_count": 100
    # }
    product.save(using='mongodb')
    return Response(product.to_json(), status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def product_update(request, product_id):
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.name = request.data.get('name', product.name)
    product.category = request.data.get('category', product.category)
    product.price = request.data.get('price', product.price)
    product.stars = request.data.get('stars', product.stars)
    product.description = request.data.get('description', product.description)
    product.product_count = request.data.get('product_count', product.product_count)
    product.save(using='mongodb')

    return Response(product.to_json(), status=status.HTTP_200_OK)

@api_view(['GET'])
def product_delete(request, product_id):
    try:
        product = Product1.objects.using('mongodb').get(product_id=product_id)
    except Product1.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.delete(using='mongodb')

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def product_inventory(request):
    products = Product1.objects.using('mongodb').filter(product_count__gt=0)
    products_json = [product.to_json() for product in products]

    return Response(products_json, status=status.HTTP_200_OK)



@login_required(login_url='/admin/')
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

# @login_required(login_url='admin')
@api_view(['GET'])
def view_products(request):
    products = Product1.objects.all()
    results = [product.to_json() for product in products]
    return Response(results, status=status.HTTP_201_CREATED)

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

@api_view(['POST'])
def view_delete_product(request, name):
    product = Product1.objects.get(name=name)
    product.delete()

@api_view(['GET'])
def view_remaining_product(request):
    product = Product1.objects.raw('select * from ... \
                                   where count > 0')
    return Response(product.to_json(), status=status.HTTP_202_ACCEPTED)

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

@login_required(login_url='/admin/')
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
    
@api_view(['GET'])
def order_list(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

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


# #USER 
# from django.shortcuts import render, redirect
# from .forms import RegisterForm
# from .models import OtpToken
# from django.contrib import messages
# from django.contrib.auth import get_user_model
# from django.utils import timezone
# from django.core.mail import send_mail
# from django.contrib.auth import authenticate, login, logout

# def index(request):
#     return render(request, "index.html")



# def signup(request):
#     form = RegisterForm()
#     if request.method == 'POST':
#         form = RegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "Account created successfully! An OTP was sent to your Email")
#             return redirect("verify-email", username=request.POST['username'])
#     context = {"form": form}
#     return render(request, "signup.html", context)



# def verify_email(request, username):
#     user = get_user_model().objects.get(username=username)
#     user_otp = OtpToken.objects.filter(user=user).last()
    
    
#     if request.method == 'POST':
#         # valid token
#         if user_otp.otp_code == request.POST['otp_code']:
            
#             # checking for expired token
#             if user_otp.otp_expires_at > timezone.now():
#                 user.is_active=True
#                 user.save()
#                 messages.success(request, "Account activated successfully!! You can Login.")
#                 return redirect("signin")
            
#             # expired token
#             else:
#                 messages.warning(request, "The OTP has expired, get a new OTP!")
#                 return redirect("verify-email", username=user.username)
        
        
#         # invalid otp code
#         else:
#             messages.warning(request, "Invalid OTP entered, enter a valid OTP!")
#             return redirect("verify-email", username=user.username)
        
#     context = {}
#     return render(request, "verify_token.html", context)




# def resend_otp(request):
#     if request.method == 'POST':
#         user_email = request.POST["otp_email"]
        
#         if get_user_model().objects.filter(email=user_email).exists():
#             user = get_user_model().objects.get(email=user_email)
#             otp = OtpToken.objects.create(user=user, otp_expires_at=timezone.now() + timezone.timedelta(minutes=5))
            
            
#             # email variables
#             subject="Email Verification"
#             message = f"""
#                                 Hi {user.username}, here is your OTP {otp.otp_code} 
#                                 it expires in 5 minute, use the url below to redirect back to the website
#                                 http://127.0.0.1:8000/verify-email/{user.username}
                                
#                                 """
#             sender = "clintonmatics@gmail.com"
#             receiver = [user.email, ]
        
        
#             # send email
#             send_mail(
#                     subject,
#                     message,
#                     sender,
#                     receiver,
#                     fail_silently=False,
#                 )
            
#             messages.success(request, "A new OTP has been sent to your email-address")
#             return redirect("verify-email", username=user.username)

#         else:
#             messages.warning(request, "This email dosen't exist in the database")
#             return redirect("resend-otp")
        
           
#     context = {}
#     return render(request, "resend_otp.html", context)


# def signin(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
        
#         if user is not None:    
#             login(request, user)
#             messages.success(request, f"Hi {request.user.username}, you are now logged-in")
#             return redirect("index")
        
#         else:
#             messages.warning(request, "Invalid credentials")
#             return redirect("signin")
        
#     return render(request, "login.html")
    