from django.contrib import admin
from . models import Product1
# from .models import CustomerUser, OtpToken
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Product1)
# admin.site.register(ExampleModel)
# class CustomUserAdmin(UserAdmin):
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2')}
#          ),
#     )


# class OtpTokenAdmin(admin.ModelAdmin):
#     list_display = ("user", "otp_code")


# admin.site.register(OtpToken, OtpTokenAdmin)
# admin.site.register(CustomerUser, CustomUserAdmin)
    