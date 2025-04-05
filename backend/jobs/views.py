from rest_framework.generics import ListAPIView # type: ignore
from .models import Job
from .serializers import JobSerializer # type: ignore

class JobsList(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
