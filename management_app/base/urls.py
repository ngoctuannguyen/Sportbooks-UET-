from django.urls import path
from . import views
from . import redis1
from .views import RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
      #api user
      path('register', RegisterView.as_view()),
      path('login', LoginView.as_view()),
      path('user', UserView.as_view()),
      path('logout', LogoutView.as_view()),
      # api product
      path(
            'products', 
            views.products,
            name='products'
      ),
      path(
            'products/product_list',
            views.product_list,
            name='product_list'
      ),
      path(
            'products/product_detail',
            views.product_detail,
            name='product_detail'
      ),
      path(
            'products/product_delete', 
            views.product_delete, 
            name='product_delete'
      ),
      path(
            'products/product_update', 
            views.product_update, 
            name='product_update'
      ),
      path(
            'products/product_search', 
            views.product_search, 
            name='product_search'
      ),
      path(
            'products/product_create', 
            views.product_create,
            name='product_create'
      ),
      # api admin
      path(
            'admins', 
            views.admins,
            name='admins'
      ),
      path(
            'admins/admin_list',
            views.admin_list,
            name='admin_list'
      ),
      path(
            'admins/admin_detail',
            views.admin_detail,
            name='admin_detail'
      ),
      path(
            'admins/admin_delete', 
            views.admin_delete, 
            name='admin_delete'
      ),
      path(
            'admins/admin_update', 
            views.admin_update, 
            name='admin_update'
      ),
      path(
            'admins/admin_create', 
            views.admin_create, 
            name='admin_create'
      ),
      path(
            'admins/admin_search', 
            views.admin_search, 
            name='admin_search'
      ),
      # api order
      path(
            'orders', 
            views.orders,
            name='orders'
      ),
      path(
            'orders/order_list',
            views.order_list,
            name='order_list'
      ),
      path(
            'orders/order_create',
            views.order_create,
            name='order_create'
      ),


    
    path(
        'cache',
        redis1.cached,
        name='cached'
    ),
    path(
        'cacheless',
        redis1.cacheless,
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
    
]
