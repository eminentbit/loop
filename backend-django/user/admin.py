from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import UserAccount

class UserAccountAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'full_name', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_superuser']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('full_name', 'role')}),

        (_('Recruiter Info'), {
            'fields': (
                'company_name', 'company_role', 'industry',
                'company_size', 'additional_info',
            )
        }),
        (_('Jobseeker / Investor Info'), {
            'fields': (
                'current_job_title', 'experience_level',
                'primary_skills', 'career_interests',
                'location_preference',
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
                'email', 'full_name', 'role', 'password1', 'password2',
                'company_name', 'company_role', 'industry',
                'company_size', 'additional_info',
                'current_job_title', 'experience_level',
                'primary_skills', 'career_interests', 'location_preference',
            ),
        }),
    )

admin.site.register(UserAccount, UserAccountAdmin)
