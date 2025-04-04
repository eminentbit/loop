from django.urls import path
from .views import RecommendedJobsList

urlpatterns = [
    path('api/recommended/', RecommendedJobsList.as_view(), name='recommended-jobs'),
]
# This URL pattern maps the path 'api/recommended/' to the RecommendedJobsList view, which will handle GET requests to retrieve recommended jobs.