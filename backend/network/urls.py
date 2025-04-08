# network/urls.py
from django.urls import path
from .views import UserListAPIView, FollowToggleAPIView

urlpatterns = [
    path('api/network/users/',      UserListAPIView.as_view(),    name='network-users'),
    path('api/network/follow-toggle/', FollowToggleAPIView.as_view(), name='network-follow-toggle'),
    path('users', UserListAPIView.as_view(), name='network-users'),
]
