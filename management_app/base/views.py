from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from email import *
from django.db import connection

from .serializers import *

from . models import *

connect_sql = connection.cursor()


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
    products = Products.objects.all()
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
    product = Products(name, category, price, star, description, description, date_created)
    product.save()
    return Response(product.to_json, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def view_delete_product(request, name):
    product = Products.objects.get(name=name)
    product.delete()

@api_view(['GET'])
def view_remaining_product(request):
    product = Products.objects.raw('select * from ... \
                                   where count > 0')
    return Response(product.to_json(), status=status.HTTP_202_ACCEPTED)

# #giỏ hàng.
# @api_view(['GET', 'POST'])
# def cart_list(request):
#     if request.method == 'GET':
#         carts = Cart.objects.all()
#         serializer = CartSerializer(carts, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = CartSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    orders = Orders.objects.all()
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
        order = Orders.objects.get(pk=pk)
    except Orders.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['PUT'])
def update_order(request, pk):
    try:
        order = Orders.objects.get(pk=pk)
    except Orders.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_order(request, pk):
    try:
        order = Orders.objects.get(pk=pk)
    except Orders.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class ProductView(generics.GenericAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def get(self, request):
        products = self.get_queryset()
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerView(generics.GenericAPIView):
    queryset = Customers.objects.all()  # Không sử dụng "using"
    serializer_class = CustomerSerializer
    
    def get(self, request):
        customers = self.get_queryset() 
        serializer = self.get_serializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartView(generics.GenericAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        customer_id = data.get('customerid')
        product_id = data.get('productid')
        quantity = data.get('quantity', 1)
        date_added = data.get('date_added')

        
        if not customer_id or not product_id:
            return Response({'error': 'Missing customerid or productid'}, status=status.HTTP_400_BAD_REQUEST)

       
        try:
            customer = Customers.objects.get(pk=customer_id)
        except Customers.DoesNotExist:
            return Response({'error': 'Invalid customerid'}, status=status.HTTP_404_NOT_FOUND)

        # Kiểm tra sự tồn tại và hợp lệ của sản phẩm
        try:
            product = Products.objects.get(pk=product_id)
        except Products.DoesNotExist:
            return Response({'error': 'Invalid productid'}, status=status.HTTP_404_NOT_FOUND)

       
        cart, created = Cart.objects.get_or_create(
            customerid=customer,
            productid=product,
            defaults={'quantity': quantity, 'date_added': date_added}
        )

        
        if not created:
            cart.quantity += int(quantity)
            cart.save()

        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class CartListView(generics.ListAPIView):

    serializer_class = CartSerializer

    def get_queryset(self):
        customer_id = self.request.query_params.get('customerid')
        if not customer_id:
            return Cart.objects.none()
        return Cart.objects.filter(customerid=customer_id)
    
    

    


# class ViewCartView(generics.ListAPIView):
#     """
#     API endpoint to view a list of cart items for a specific customer.
#     """
#     serializer_class = CartSerializer

#     def get(self, request, *args, **kwargs):
#         customerid = request.query_params.get('customerid')
#         if not customerid:
#             return Response({'error': 'Missing customerid parameter'}, status=status.HTTP_400_BAD_REQUEST)

#         queryset = self.get_queryset()  # Gọi phương thức get_queryset để lấy queryset cụ thể cho khách hàng
#         queryset = queryset.filter(customerid=customerid)  # Lọc ra các mục giỏ hàng cho khách hàng cụ thể
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def get_queryset(self):
#         return Cart.objects.using("mysql").all()  # Sử dụng `.all()` hoặc bất kỳ phương thức queryset nào khác bạn muốn ở đây


class UpdateCartView(generics.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def put(self, request, *args, **kwargs):
        customer_id = self.request.query_params.get('customerid')
        product_id = request.data.get('productid')
        quantity = request.data.get('quantity')

        if not customer_id:
            return Response({"error": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(customerid=customer_id, productid=product_id)
            cart.quantity = quantity
            cart.save()
            return Response(CartSerializer(cart).data)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)


        
class RemoveFromCartView(generics.DestroyAPIView):
    queryset = Cart.objects.all()  
    serializer_class = CartSerializer

    def delete(self, request, *args, **kwargs):
        customer_id = self.request.query_params.get('customerid')
        if not customer_id:
            return Response({"error": "customerid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.filter(customerid=customer_id)
            if not cart.exists():
                return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
            
            cart.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderCreateAPIView(APIView):
    def post(self, request, format=None):
        
        serializer = OrderSerializer(data=request.data)
        customer_id = request.data.get('customerid')
        product_id = request.data.get('productd'),
        quantity = request.data.get('quantity'),
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailAPIView(APIView):
    def get(self, request, orderid, format=None):
        order = Orders.objects.get(orderid=orderid)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
class OrderUpdateAPIView(APIView):
    def put(self, request, orderid, format=None):
        order = Orders.objects.get(orderid=orderid)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDeleteAPIView(APIView):
    def delete(self, request, orderid, format=None):
        order = Orders.objects.get(orderid=orderid)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class OrderProductCreateAPIView(APIView):
#     def post(self, request, format=None):
#         # serializer = OrderProductSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class OrderProductListAPIView(APIView):
#     def get(self, request, orderid, format=None):
#         order_products = OrderProducts.objects.filter(orderid=orderid)
#         serializer = OrderProductSerializer(order_products, many=True)
#         return Response(serializer.data)
# class OrderProductUpdateAPIView(APIView):
#     def put(self, request, orderid, productid, format=None):
#         order_product = OrderProducts.objects.get(orderid=orderid, productid=productid)
#         serializer = OrderProductSerializer(order_product, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class OrderProductDeleteAPIView(APIView):
#     def delete(self, request, orderid, productid, format=None):
#         order_product = OrderProducts.objects.get(orderid=orderid, productid=productid)
#         order_product.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

"""ABC"""

# class ContactView(generics.GenericAPIView):
#     queryset = Contactdetails.objects.all()
#     serializer_class = ContactDetailSerializer
    
#     def get(self,request):
#         contacts = self.get_queryset() 
#         serializer = self.get_serializer(contacts, many=True)
#         return Response(serializer.data,status=status.HTTP_200_OK)
    
#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     
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