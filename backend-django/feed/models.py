from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

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
        return f"{self.type.title()} by {self.user.get_full_name()} at {self.created_at}"

class Comment(models.Model):
    feed = models.ForeignKey(Feed, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='comment_likes', blank=True)
    reported = models.BooleanField(default=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    reported_count = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

    def __str__(self):
        return f"Comment by {self.user.get_full_name()}"

class Report(models.Model):
    REPORT_TYPES = [
        ('spam', 'Spam'),
        ('inappropriate', 'Inappropriate Content'),
        ('harassment', 'Harassment'),
        ('violence', 'Violence'),
        ('other', 'Other'),
    ]

    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='reports', null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='reports', null=True, blank=True)
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reports_made')
    reason = models.CharField(max_length=50, choices=REPORT_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    is_deleted = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

    def __str__(self):
        target = self.feed if self.feed else self.comment
        return f"Report by {self.reporter.get_full_name()} on {target}"
