from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Enrollment, Streak
from .serializers import EnrollmentSerializer, StreakSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
