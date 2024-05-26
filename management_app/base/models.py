import datetime
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User, AbstractUser
import secrets
from django.core.cache import cache
from django.contrib.auth.models import Group

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    date_of_birth = models.DateField(null=True, blank=True) # Cho phép null và blank
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(
        max_length=6,
        choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE')]
    )

    def __str__(self):
        return self.user.username

class Product1(models.Model):
    product_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    category = models.CharField(max_length=100, null=False, blank=False,default='Shoes')
    price = models.IntegerField(null=False, blank=False)
    stars = models.DecimalField(decimal_places=2, max_digits=3)
    price = models.IntegerField(null=False, blank=False)
    stars = models.DecimalField(decimal_places=2, max_digits=3)
    description = models.TextField(null=True, blank=True)
    url = models.TextField(null=True, blank=True)
    url = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True)
    product_count = models.IntegerField(null=False, blank=False, default=0)
    product_count = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return self.name
    
    def to_json(self):
        return {
            'id': self.product_id,
            'name': self.name,
            'category': self.category,
            'stars': float(str(self.stars)) if self.stars else None,
            'stars': float(str(self.stars)) if self.stars else None,
            'desc': self.description,
            'url': self.url,
            'price': self.price,
            'url': self.url,
            'price': self.price,
            'date_created': self.date_created,
            'date_modified': self.date_modified,
            'product_count': self.product_count
        }

class Admin(models.Model):
    admin_id = models.IntegerField(primary_key=True)
    admin_username = models.CharField(max_length=60, null=False)
    admin_name = models.CharField(max_length=60, null=False)
    admin_email = models.CharField(max_length=50)
    admin_address = models.TextField()
    admin_phonenumber = models.CharField(max_length=15)
    admin_gender = models.CharField(max_length=6)

    def __str__(self):
        return self.admin_username

    def to_json(self):
        return {
            'id': self.admin_id,
            'username': self.admin_username,
            'name': self.admin_name,
            'email': self.admin_email,
            'address': self.admin_address,
            'phone': self.admin_phonenumber,
            'gender': self.admin_gender
        }

class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    customer_name = models.CharField(max_length=60, null=False)
    customer_email = models.CharField(max_length=50)
    customer_address = models.TextField()
    customer_phonenumber = models.CharField(max_length=15)

    def __str__(self):
        return self.customer_name

    def to_json(self):
        return {
            'id': self.customer_id,
            'name': self.customer_name,
            'email': self.customer_email,
            'address': self.customer_address,
            'phone': self.customer_phonenumber
        }

# class Order(models.Model):
#     order_id = models.IntegerField(primary_key=True)
#     product_id = models.IntegerField()
#     customer_id = models.IntegerField()
#     date_created = models.DateTimeField(auto_now_add=True)
#     quantity = models.IntegerField()
#     status = models.CharField(max_length=20, default='PENDING')
#     total_price = models.DecimalField(decimal_places=2, max_digits=6)

        


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey('Customer',on_delete=models.CASCADE,db_column='customer_id')
    product_id = models.ForeignKey('Product1',on_delete=models.CASCADE,db_column='product_id')
    quantity = models.IntegerField()
    price = models.IntegerField()
    orderDate = models.DateTimeField()

    def __str__(self):
        return f"Order {self.order_id}"


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
