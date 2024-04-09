from django.db import models
from django_redis import get_redis_connection
from django.core.cache import cache

# Create your models here.
# Connect to MongoDB
class Product1(models.Model):
    # name = models.CharField(max_length=200, null=False, blank=False)
    # category = models.CharField(max_length=100, null=False, blank=False)
    # price = models.DecimalField(max_digits=4, decimal_places=2)
    # description = models.TextField()
    # stars = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True)

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
        }
    
# # Categories table
class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)

    def __str__(self):
        return self.name

#     ### How about indexing

# # Products table
    
    
# # Customers table
# class Customer(models.Model):
#     customer_id = models.AutoField(primary_key=True)
#     customer_name = models.CharField(max_length=60, null=False)
#     customer_email = models.CharField(max_length=50)
#     customer_address = models.TextField()
#     cumstomer_phonenumber = models.CharField(max_length=15)

# # Order table
# # class Order(models.Model):

# # # Review MongoDB
# # class Reviews(models.Model):

# # # History
# # class History(models.Model):
    
# # # Tickets
# # class Tickets(models.Model):

# # # Trips
# # class Trips(models.Model):


# # # cart
# # class Cart(models.Model):

# # # payments
# class payments(models.Model):
#     payment_id = models.AutoField(primary_key=True)
#     order_id = models.IntegerField()
#     payment_date = models.DateTimeField()
#     amount = models.DecimalField(decimal_places=2)
#     payment_method = models.CharField(max_length=50)
#     order = models.ForeignKey("Order", verbose_name=(""), on_delete=models.CASCADE)

# Redis

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
