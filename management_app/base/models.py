import datetime
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User, AbstractUser
import secrets

# from django_redis import get_redis_connection
from django.core.cache import cache

#we added a description field to store a text description for each group.
from django.contrib.auth.models import Group
my_group = Group.objects.get(name='admin') 


# my_group.user_set.add('NTN0301')
# user = User()
# User.groups.add('NTN0301')

# class CustomGroup(Group):
#     description = models.TextField(blank=True)

#from receiver import *

# Create your models here.

# class CustomerUser(AbstractUser):
   
#     email = models.EmailField(unique=True)
    
#     USERNAME_FIELD = ("email")
#     REQUIRED_FIELDS = ["username"]
    
#     def __str__(self):
#         return self.email
    
# class OtpToken(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="otps")
#     otp_code = models.CharField(max_length=6, default=secrets.token_hex(3))
#     tp_created_at = models.DateTimeField(auto_now_add=True)
#     otp_expires_at = models.DateTimeField(blank=True, null=True)
    
    
#     def __str__(self):
#         return self.user.username

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # username = models.CharField(max_length=100)
    # email = models.EmailField(unique=True)
    # password = models.CharField(max_length=100)
    
    #thông tin cá nhân
    # first_name = models.CharField(max_length=50)
    # last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True) # Cho phép null và blank
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(
        max_length=6,
        choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE')]
    )

     #thông tin đăng nhập
    # last_login = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.username

# Connect to MongoDB
class Product1(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    category = models.CharField(max_length=100, null=False, blank=False,default='Shoes')
    price = models.DecimalField(max_digits=4, decimal_places=2)
    stars = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True)
    product_count = models.IntegerField()

    def __str__(self):
        return self.name
    
    def to_json(self):
        return {
            # 'id': self.id,
            'name': self.name,
            'desc': self.description,
            'price': self.price,
            'date_created': self.date_created,
            'date_modified': self.date_modified,
            'product_count': self.product_count
        }
    
# # Categories table
class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)

    def __str__(self):
        return self.name
    
    class Meta: 
        indexes = [
            models.Index(fields=['name'])
        ]

#     ### How about indexing

# # Products table
    
    
# # Customers table
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=60, null=False)
    customer_email = models.CharField(max_length=50)
    customer_address = models.TextField()
    cumstomer_phonenumber = models.CharField(max_length=15)

# # Order table
# class Order(models.Model):

# # # Review MongoDB
# # class Reviews(models.Model):

# # # History
# # class History(models.Model):
        # filter
    
# # # Tickets
# # class Tickets(models.Model):

# # # Trips
# # class Trips(models.Model):


# # # cart
# # class Cart(models.Model):
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.IntegerField()
    quantity = models.IntegerField()
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'

# # payments
class payments(models.Model):
    payment_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField()
    payment_date = models.DateTimeField()
    amount = models.DecimalField(decimal_places=2,max_digits=6)
    payment_method = models.CharField(max_length=50)
    order_id = models.ForeignKey("Order",  on_delete=models.CASCADE, db_column='order_id')

    def __str__(self):
        return self.payment_method

# Redis
class Order(models.Model):
    # order_id = models.IntegerField(primary_key=True)
    # customer_id = models.ForeignKey('Customer',on_delete=models.CASCADE,db_column='customer_id')
    # product_id = models.ForeignKey('Product1',on_delete=models.CASCADE,db_column='product_id')
    # quantity = models.IntegerField()
    # price = models.IntegerField()
    # orderDate = models.DateTimeField()
    order_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey('Customer',on_delete=models.CASCADE,db_column='customer_id')
    product_id = models.ForeignKey('Product1',on_delete=models.CASCADE,db_column='product_id')
    quantity = models.IntegerField()
    price = models.IntegerField()
    orderDate = models.DateTimeField()

    def __str__(self):
        return f"Order {self.order_id}"
