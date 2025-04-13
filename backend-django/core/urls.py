# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.http import JsonResponse

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/jobs/', include('jobs.urls')),          
    path('api/network/', include('network.urls')), 
    path('api/learning/', include('learning.urls')),
    path('api/auth/', include('user.urls')),
    path('', lambda request: JsonResponse({'Success': 'True'})),  
]
