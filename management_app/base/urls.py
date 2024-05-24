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
            'products/product_search', 
            views.product_search, 
            name='product_search'
      ),
      path(
            'products/product_detail/<int:product_id>',
            views.product_detail,
            name='product_detail'
      ),
      path(
            'products/product_create', 
            views.product_create,
            name='product_create'
      ),
      path(
            'products/product_update/<int:product_id>', 
            views.product_update, 
            name='product_update'
      ),
      path(
            'products/product_delete/<int:product_id>', 
            views.product_delete, 
            name='product_delete'
      ),
      path(
            'products/product_inventory', 
            views.product_inventory, 
            name='product_inventory'
      ),
      # api customer
      path(
            'customers/customer_list',
            views.customer_list,
            name='customer_list'
      ),
      path(
            'customers/customer_search', 
            views.customer_search, 
            name='customer_search'
      ),
      path(
            'customers/customer_detail/<int:customer_id>',
            views.customer_detail,
            name='customer_detail'
      ),
      path(
            'customers/customer_create', 
            views.customer_create,
            name='customer_create'
      ),
      path(
            'customers/customer_update', 
            views.customer_update, 
            name='customer_update'
      ),
      path(
            'customers/customer_delete/<int:customer_id>', 
            views.customer_delete, 
            name='customer_delete'
      ),
    
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
