# network/models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user     = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar   = models.URLField(blank=True, null=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Follow(models.Model):
    follower  = models.ForeignKey(User, related_name='following_set', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='followers_set', on_delete=models.CASCADE)
    created   = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')
