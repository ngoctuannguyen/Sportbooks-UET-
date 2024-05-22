from django.urls import path
from . import views
from . import redis
from  base.views import *

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
#     path('cart', 
#          views.cart_list,
#          name= 'cart'),
    path('users',
          views.user_list,
          name= 'users'),
    path('users/<int:pk>/',
          views.user_detail),
    path('orders/',
          views.order_list),
    path('orders/<int:pk>/',
          views.order_detail),
    path('orders/create/',
          views.create_order),
    path('orders/update/<int:pk>/',
          views.update_order),
    path('orders/delete/<int:pk>/',
          views.delete_order),
      path ('customers/',CustomerView.as_view(), name = 'homes'),
      path ('products/', ProductView.as_view(), name = 'products'),
      path ('cart/add/', CartView.as_view(), name = 'cartAdd'),
      path('cart/userList/', CartListView.as_view(), name='cart-list'),
      path ('cart/update/',UpdateCartView.as_view(), name = 'updateCart'),
      path ('cart/delete/', RemoveFromCartView.as_view(), name = 'deleteCart'),
      path('orders/create/', OrderCreateAPIView.as_view(), name='order-create'),
    path('orders/<int:orderid>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('orders/<int:orderid>/update/', OrderUpdateAPIView.as_view(), name='order-update'),
    path('orders/<int:orderid>/delete/', OrderDeleteAPIView.as_view(), name='order-delete'),
     

]
