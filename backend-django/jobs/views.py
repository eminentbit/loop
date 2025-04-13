# jobs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

class JobListView(APIView):
    def get(self, request):
        jobs = Job.objects.all().order_by('-posted_at')
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
