# jobs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer

# GET all jobs, POST new job
class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-posted_at')
    serializer_class = JobSerializer

# GET single job by ID
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
