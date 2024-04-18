from django.urls import path
from . import views
from . import redis

urlpatterns = [
    
    path(
        '', 
        views.view_product_detail,
        name='view_product_detail'
    ),
    path(
        'books',
        views.view_products,
        name='home'
    ),
    path(
        'cache',
        redis.cached,
        name='cached'
    ),
    path(
        'cacheless',
        redis.cacheless,
        name='cacheless'
    ),
    path('cart', 
         views.cart_list,
         name= 'cart'),
    path('users',
          views.user_list,
          name= 'users'),
    path('users/<int:pk>/',
          views.user_detail),
    
]
