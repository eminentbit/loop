from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField()

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    hours_spent = models.PositiveIntegerField(default=0)
    quizzes_taken = models.PositiveIntegerField(default=0)

class Streak(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.CharField(max_length=3)  # 'Sun', 'Mon', etc.
    active = models.BooleanField(default=False)
