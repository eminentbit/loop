from django.urls import path
from rest_framework.routers import DefaultRouter # type: ignore
from .views import FullNameFromEmail, LoginView, LogoutView, NotificationViewSet, RegisterView, UserProfileView, get_csrf_token 
from .views import NotificationViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = router.urls

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('register/', RegisterView.as_view(), name='register'),
     path('user/full-name/', FullNameFromEmail.as_view()),
    path('csrf/', get_csrf_token),
]

urlpatterns += router.urls