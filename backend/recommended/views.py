from rest_framework.generics import ListAPIView # type: ignore
from .models import Job
from .serializers import JobSerializer # type: ignore

class RecommendedJobsList(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
