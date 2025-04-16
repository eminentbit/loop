from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
from django.db import models
from django.conf import settings

User = get_user_model()

class Feed(models.Model):
    FEED_TYPE_CHOICES = [
        ('media', 'Media'),
        ('event', 'Event'),
        ('article', 'Article'),
        ('live', 'Live'),
        ('text', 'Text'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feeds')
    type = models.CharField(max_length=20, choices=FEED_TYPE_CHOICES)
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to='feed_images/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    event_date = models.DateTimeField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    comments_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.type.title()} by {self.user.fullName} at {self.created_at}"
    

class Comment(models.Model):
    feed = models.ForeignKey(Feed, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
