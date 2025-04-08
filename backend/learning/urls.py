from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.learning_dashboard, name='learning-dashboard'),
]
