from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['product_id', 'name', 'category', 'price', 'stars', 'description', 'date_created', 'date_modified', 'product_count']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user', 'product_id', 'quantity', 'added_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password'] # Các trường hiển thị hoặc cho phép chỉnh sửa
        extra_kwargs = {'password': {'write_only': True}} # password chỉ để ghi
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'

class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contactdetails
        fields = '__all__'