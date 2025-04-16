from django.contrib import admin
from .models import Course, Enrollment, Streak

# Register your models here.
admin.register(Course, Enrollment, Streak)