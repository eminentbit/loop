from rest_framework.generics import ListAPIView
from .models import Job
from .serializers import JobSerializer

class RecommendedJobsList(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
