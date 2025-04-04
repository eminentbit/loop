from django.urls import path
from .views import RecommendedJobsList

urlpatterns = [
    path('', RecommendedJobsList.as_view(), name='recommended-jobs'),
]
