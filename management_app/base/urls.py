from django.urls import path
from . import views

urlpatterns = [
    path(
        '', 
        views.apiOverview,
        name='apiOverview'
    ),
    path(
        'books',
        views.view_books,
        name='home'
    ),
    path(
        'cache',
        views.view_cache_books,
        name='NTN'
    )
]
