import datetime
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User, AbstractUser
import secrets

# from django_redis import get_redis_connection
from django.core.cache import cache

#we added a description field to store a text description for each group.
from django.contrib.auth.models import Group
#
class Cart(models.Model):
    customerid = models.OneToOneField('Customers', models.DO_NOTHING, db_column='customerId', primary_key=True)  # Field name made lowercase. The composite primary key (customerId, productId) found, that is not supported. The first column is selected.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='productId')  # Field name made lowercase.
    quantity = models.IntegerField()
    date_added = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cart'
        unique_together = (('customerid', 'productid'),)


class Categories(models.Model):
    catid = models.AutoField(db_column='catId', primary_key=True)  # Field name made lowercase.
    catname = models.CharField(db_column='catName', max_length=120)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'categories'


class Contactdetails(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    district = models.CharField(max_length=45, blank=True, null=True)
    city = models.CharField(max_length=45)
    country = models.CharField(max_length=45)
    zipcode = models.IntegerField()
    phone = models.CharField(max_length=20)
    street = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contactdetails'


class Customers(models.Model):
    customer_id = models.AutoField(db_column='customer_Id', primary_key=True)  # Field name made lowercase.
    customer_fname = models.CharField(max_length=60)
    customer_lname = models.CharField(max_length=60)
    phone = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers'


class Orderproducts(models.Model):
    orderid = models.OneToOneField('Orders', models.DO_NOTHING, db_column='orderId', primary_key=True)  # Field name made lowercase. The composite primary key (orderId, productId) found, that is not supported. The first column is selected.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='productId')  # Field name made lowercase.
    price = models.FloatField()
    quantity = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'orderproducts'
        unique_together = (('orderid', 'productid'),)


class Orders(models.Model):
    orderid = models.AutoField(db_column='orderId', primary_key=True)  # Field name made lowercase.
    customerid = models.ForeignKey(Customers, models.DO_NOTHING, db_column='customerId', blank=True, null=True)  # Field name made lowercase.       
    orderdate = models.DateField(db_column='orderDate')  # Field name made lowercase.
    shippingaddressid = models.ForeignKey(Contactdetails, models.DO_NOTHING, db_column='shippingAddressId')  # Field name made lowercase.
    status = models.CharField(max_length=10)
    deliverydate = models.DateField(db_column='deliveryDate')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'orders'


class Payments(models.Model):
    paymentid = models.AutoField(db_column='paymentId', primary_key=True)  # Field name made lowercase.
    orderid = models.ForeignKey(Orders, models.DO_NOTHING, db_column='orderId', blank=True, null=True)  # Field name made lowercase.
    paymentdate = models.DateField(db_column='paymentDate', blank=True, null=True)  # Field name made lowercase.
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    paymentmethod = models.CharField(db_column='paymentMethod', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'payments'


class Productimages(models.Model):
    productid = models.OneToOneField('Products', models.DO_NOTHING, db_column='productId', primary_key=True)  # Field name made lowercase. The composite primary key (productId, imageUrl) found, that is not supported. The first column is selected.
    imageurl = models.CharField(db_column='imageUrl', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'productimages'
        unique_together = (('productid', 'imageurl'),)


class Products(models.Model):
    productname = models.CharField(db_column='productName', max_length=120)  # Field name made lowercase.
    catid = models.ForeignKey(Categories, models.DO_NOTHING, db_column='catId', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock_quantity = models.IntegerField(blank=True, null=True)
    instock = models.IntegerField(db_column='inStock', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'products'


class Reviewimages(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    imageurl = models.CharField(db_column='imageUrl', max_length=255, blank=True, null=True)  # Field name made lowercase.
    reviewid = models.ForeignKey('Reviews', models.DO_NOTHING, db_column='reviewId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'reviewimages'


class Reviews(models.Model):
    reviewid = models.AutoField(db_column='reviewId', primary_key=True)  # Field name made lowercase.
    productid = models.ForeignKey(Products, models.DO_NOTHING, db_column='productId', blank=True, null=True)  # Field name made lowercase.
    customerid = models.ForeignKey(Customers, models.DO_NOTHING, db_column='customerId', blank=True, null=True)  # Field name made lowercase.       
    rating = models.IntegerField(blank=True, null=True)
    reviewcomment = models.TextField(db_column='reviewComment', blank=True, null=True)  # Field name made lowercase.
    reviewdate = models.DateField(db_column='reviewDate', blank=True, null=True)  # Field name made lowercase.
    helpfulvotes = models.IntegerField(db_column='helpfulVotes', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'reviews'


class Roles(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)  # Field name made lowercase.
    rolename = models.CharField(db_column='roleName', max_length=45)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='Created_at')  # Field name made lowercase.
    updated_at = models.DateTimeField(db_column='Updated_at')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'roles'


class Tickets(models.Model):
    ticketid = models.AutoField(db_column='ticketId', primary_key=True)  # Field name made lowercase. The composite primary key (ticketId, customerId) found, that is not supported. The first column is selected.
    eventname = models.CharField(db_column='eventName', max_length=255)  # Field name made lowercase.
    eventdate = models.DateField(db_column='eventDate', blank=True, null=True)  # Field name made lowercase.
    venue = models.CharField(max_length=50, blank=True, null=True)
    ticketprice = models.DecimalField(db_column='ticketPrice', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    isavailable = models.IntegerField(db_column='isAvailable')  # Field name made lowercase.
    customerid = models.ForeignKey(Customers, models.DO_NOTHING, db_column='customerId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tickets'
        unique_together = (('ticketid', 'customerid'),)





class Trips(models.Model):
    tripid = models.AutoField(db_column='tripId', primary_key=True)  # Field name made lowercase.
    eventid = models.ForeignKey(Tickets, models.DO_NOTHING, db_column='eventId', blank=True, null=True)  # Field name made lowercase.
    departuredate = models.DateField(db_column='departureDate', blank=True, null=True)  # Field name made lowercase.
    returndate = models.DateField(db_column='returnDate', blank=True, null=True)  # Field name made lowercase.
    eventdescription = models.TextField(db_column='eventDescription', blank=True, null=True)  # Field name made lowercase.
    destination = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trips'


class Users(models.Model):
    username = models.CharField(unique=True, max_length=45)
    password = models.CharField(max_length=45)
    email = models.CharField(unique=True, max_length=60, blank=True, null=True)
    status = models.CharField(max_length=8)
    role = models.ForeignKey(Roles, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Wishlist(models.Model):
    customer = models.OneToOneField(Customers, models.DO_NOTHING, primary_key=True)  # The composite primary key (customer_id, product_id) found, that is not supported. The first column is selected.
    product_id = models.IntegerField()
    date_added = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wishlist'
        unique_together = (('customer', 'product_id'),)

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