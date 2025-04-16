from django.urls import include, path
from rest_framework.routers import DefaultRouter # type: ignore
from .views import CourseViewSet, EnrollmentViewSet, StreakViewSet
# from . import views

router = DefaultRouter()
router.register('courses', CourseViewSet)
router.register('enrollments', EnrollmentViewSet)
router.register('streaks', StreakViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
