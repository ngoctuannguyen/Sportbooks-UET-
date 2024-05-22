from rest_framework import serializers
from .models import Cart,User,Orders, Customers, Products, Categories

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['catId', 'catName']
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['customerid', 'productid', 'quantity', 'date_added' ]

class ProductSerializer(serializers.ModelSerializer):
    catid = CategorySerializer(read_only=True)

    class Meta:
        model = Products
        fields = ['productname', 'catid', 'description', 'price', 'stock_quantity', 'instock']

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
    def create(self, validated_data):
        return Customers.objects.create(**validated_data)
