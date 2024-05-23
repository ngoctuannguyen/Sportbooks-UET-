"""
URL configuration for management_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework_simplejwt import views as jwt_views
import logging
import pymongo
logger = logging.getLogger(__name__)
logger.debug("LOG_MSG_DEBUG")
logger.info("LOG_MSG_INFO")
logger.warn("LOG_MSG_WARN")
logger.error("LOG_MSG_ERROR")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('__debug__/', include('debug_toolbar.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('admin/defender/', include('defender.urls')) # defender admin
]
