from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import AllowAny, IsAuthenticated # type: ignore
from rest_framework import viewsets, permissions # type: ignore
from .models import Course, Enrollment, Streak
from .serializers import CourseSerializer, EnrollmentSerializer, StreakSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def learning_dashboard(request):
    user = request.user
    enrollments = Enrollment.objects.filter(user=user)
    streak = Streak.objects.filter(user=user)

    total_courses = enrollments.count()
    completed = enrollments.filter(completed=True).count()
    total_hours = sum(e.hours_spent for e in enrollments)
    total_quizzes = sum(e.quizzes_taken for e in enrollments)
    progress_percent = int((completed / total_courses) * 100) if total_courses else 0

    return Response({
        'overall_progress': progress_percent,
        'enrolled': total_courses,
        'completed': completed,
        'hours': total_hours,
        'quizzes': total_quizzes,
        'courses': EnrollmentSerializer(enrollments, many=True).data,
        'streak': StreakSerializer(streak, many=True).data
    })

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]  # Anyone can view courses

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class StreakViewSet(viewsets.ModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Streak.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
