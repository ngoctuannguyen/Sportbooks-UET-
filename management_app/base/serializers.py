from rest_framework import serializers
from .models import Cart,User

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user', 'product_id', 'quantity', 'added_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password'] # Các trường hiển thị hoặc cho phép chỉnh sửa
        extra_kwargs = {'password': {'write_only': True}} # password chỉ để ghi