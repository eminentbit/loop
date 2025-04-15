from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import UserAccount

class UserAccountAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'fullName', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_superuser']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('full_name', 'role')}),

        (_('Recruiter Info'), {
            'fields': (
                'companyName', 'companyRole', 'industry',
                'companySize', 'additionalInfo',
            )
        }),
        (_('Jobseeker / Investor Info'), {
            'fields': (
                'currentJobTitle', 'experienceLevel',
                'primarySkills', 'careerInterests',
                'locationPreference',
            )
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Important Dates'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'fullName', 'role', 'password1', 'password2',
                'companyName', 'companyRole', 'industry',
                'companySize', 'additionalInfo',
                'currentJobTitle', 'experienceLevel',
                'primarySkills', 'careerInterests', 'locationPreference',
            ),
        }),
    )

admin.site.register(UserAccount, UserAccountAdmin)
