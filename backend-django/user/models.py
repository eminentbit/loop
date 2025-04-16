from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, fullName, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, fullName=fullName, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fullName, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, fullName, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('jobseeker', 'Jobseeker'),
        ('recruiter', 'Recruiter'),
        ('investor', 'Investor'),
    ]

    email = models.EmailField(unique=True)
    fullName = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    # Common fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Recruiter specific
    companyName = models.CharField(max_length=255, blank=True, null=True)
    companyRole = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    companySize = models.CharField(max_length=100, blank=True, null=True)
    additionalInfo = models.TextField(blank=True, null=True)

    # Jobseeker/Investor specific
    currentJobTitle = models.CharField(max_length=255, blank=True, null=True)
    experienceLevel = models.CharField(max_length=255, blank=True, null=True)
    primarySkills = models.TextField(blank=True, null=True)
    careerInterests = models.TextField(blank=True, null=True)
    locationPreference = models.CharField(max_length=255, blank=True, null=True)

    agree_to_terms = models.BooleanField(default=True)

    ai_matching=models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullName']

    def __str__(self):
        return self.email


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("message", "Message"),
        ("mention", "Mention"),
        ("community", "Community"),
        ("other", "Other"),
    ]

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="notifications")
    content = models.TextField()
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default="other")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} - {self.content[:20]}"

