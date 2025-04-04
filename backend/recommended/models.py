from django.db import models

class Recommended (models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    locatiom = models.CharField(max_length=200, blank=True, null=True)
    description= models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    job_type = models.CharField(
        max_length=50,
        choices=[
            ('full_time', 'Full Time'),
            ('part_time', 'Part Time'),
            ('contract', 'Contract'),
            ('internship', 'Internship'),
        ],
        default='full_time'
    )
    posted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted_at']

    def __str__(self):
        return f"{self.title} at {self.company}"

# Create your models here.
