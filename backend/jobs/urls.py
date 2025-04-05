from django.urls import path
from .views import JobsList

urlpatterns = [
    path('', JobsList.as_view(), name='jobs'),
]
