# jobs/models.py
from django.db import models

class Job(models.Model):
    JOB_TYPES = [
        ('Full-time', 'Full-time'),
        ('Contract', 'Contract'),
    ]

    LOCATIONS = [
        ('Remote', 'Remote'),
        ('Hybrid   ', 'Hybrid'),
        ('On-site', 'On-site'),
    ]

    SALARY_RANGES = [
        ('$60k - $80k', '$60k - $80k'),
        ('$70k - $90k', '$70k - $90k'),
        ('$80k - $100k', '$80k - $100k'),
        ('100k+', '100k+'),
    ]

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=50, choices=LOCATIONS)
    type = models.CharField(max_length=50, choices=JOB_TYPES)
    salary = models.CharField(max_length=50, choices=SALARY_RANGES)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.company}"
