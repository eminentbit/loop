from django.contrib import admin
from .models import Profile, Follow, Page, Event


# Register your models here.
admin.register(Profile, Follow, Page, Event)