# network/urls.py
from django.urls import path
from .views import UserListAPIView, FollowToggleAPIView

urlpatterns = [
    path('follow-toggle/', FollowToggleAPIView.as_view(), name='network-follow-toggle'),
    path('users/', UserListAPIView.as_view(), name='network-users'),
]
