from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, full_name, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('jobseeker', 'Jobseeker'),
        ('recruiter', 'Recruiter'),
        ('investor', 'Investor'),
    ]

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    # Common fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Recruiter specific
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_role = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    company_size = models.CharField(max_length=100, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)

    # Jobseeker/Investor specific
    current_job_title = models.CharField(max_length=255, blank=True, null=True)
    experience_level = models.CharField(max_length=255, blank=True, null=True)
    primary_skills = models.TextField(blank=True, null=True)
    career_interests = models.TextField(blank=True, null=True)
    location_preference = models.CharField(max_length=255, blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email