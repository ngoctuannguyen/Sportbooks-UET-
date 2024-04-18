from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

# from django_redis import get_redis_connection
from django.core.cache import cache
#from receiver import *

# Create your models here.

# class UserModel(models.Models):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     bio = models.TextField(blank=True)
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    #thông tin cá nhân
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True) # Cho phép null và blank
    phone_number = models.CharField(max_length=20, null=True, blank=True)

     #thông tin đăng nhập
    last_login = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username

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
    order_id = models.IntegerField(primary_key=True)
    customer_id = models.ForeignKey('Customer',on_delete=models.CASCADE,db_column='customer_id')
    product_id = models.ForeignKey('Product1',on_delete=models.CASCADE,db_column='product_id')
    quantity = models.IntegerField()
    price = models.IntegerField()
    orderDate = models.DateTimeField()
# class ExampleModel(models.Model):
#     name = models.CharField(max_length=100)
#     redis_connection = get_redis_connection()
#     def save(self, *args, **kwargs):
#         self.redis_connection.set(self.name, self.name)
#         super().save(*args, **kwargs)
#     def retrieve_data(self):
#         return self.redis_connection.get(self.name)

# def get_data():
#     data = cache.get('my_data')
#     if data is None:
#         # data = retrieve_data()    
#         cache.set('my_data', data, timeout=3600)
#     return data
