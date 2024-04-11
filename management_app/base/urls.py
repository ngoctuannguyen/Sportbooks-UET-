from django.urls import path
from . import views

urlpatterns = [
    # path(
    #     '', 
    #     views.apiOverview,
    #     name='apiOverview'
    # ),
    path(
        'products',
        views.view_products,
        name='home'
    ),
    path(
        'cache',
        views.view_cached_books,
        name='NTN'
    )
]
