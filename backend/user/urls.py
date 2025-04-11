from django.urls import path
from .views import LoginView, LogoutView, RegisterView, UserProfileView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('register', RegisterView.as_view(), name='register')
]
