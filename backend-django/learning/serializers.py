from rest_framework import serializers
from .models import Course, Enrollment, Streak

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Enrollment
        fields = ['course', 'completed', 'hours_spent', 'quizzes_taken']

class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = ['day', 'active']
