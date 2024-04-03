from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    category = models.CharField(max_length=100, null=False, blank=False)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField()
    stars = models.IntegerField()

    def __str__(self):
        return self.name
    
# Categories table
class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    ### How about indexing

# Products table
    
    
# Customers table
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=60, null=False)
    customer_email = models.CharField(max_length=50)
    customer_address = models.TextField()
    cumstomer_phonenumber = models.CharField(max_length=15)

# Order table
# class Order(models.Model):

# # Review
# class Reviews(models.Model):

# # History
# class History(models.Model):
    
# # Tickets
# class Tickets(models.Model):

# # Trips
# class Trips(models.Model):


# # cart
# class Cart(models.Model):

# # payments
class payments(models.Model):
    payment_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField()
    payment_date = models.DateTimeField()
    amount = models.DecimalField(decimal_places=2)
    payment_method = models.CharField(max_length=50)
    order = models.ForeignKey("Order", verbose_name=_(""), on_delete=models.CASCADE)