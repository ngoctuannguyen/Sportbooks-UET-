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

# from django.contrib.auth.admin import GroupAdmin
# from django.contrib.auth.models import Group
# from django.utils.translation import gettext_lazy as _
# from .models import CustomGroup

# admin.site.register(Group)

# @admin.register(CustomGroup)
# class CustomGroupAdmin(GroupAdmin):
#     fieldsets = (
#         (None, {'fields': ('name', 'permissions')}),
#         (_('Description'), {'fields': ('description',)}),
#     )



# class OtpTokenAdmin(admin.ModelAdmin):
#     list_display = ("user", "otp_code")


# admin.site.register(OtpToken, OtpTokenAdmin)
# admin.site.register(CustomerUser, CustomUserAdmin)
    
# from django.contrib.auth.models import User, Group, Permission
# from django.contrib.contenttypes.models import ContentType

# # Step 1: Create custom permissions
# content_type = ContentType.objects.get_for_model(MyModel)
# permission = Permission.objects.create(
#     codename='custom_permission',
#     name='Can access custom feature',
#     content_type=content_type
# )

# # Step 2: Add permissions to a group
# group = Group.objects.create(name='My Group')
# group.permissions.add(permission)

# # Step 3: Assign the group to a user
# user = User.objects.get(username='john')
# user.groups.add(group)
