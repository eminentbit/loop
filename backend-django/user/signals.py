# notifications/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Notification
from feed.models import Feed  # example use case
from django.utils.timezone import now

User = get_user_model()

@receiver(post_save, sender=Feed)
def notify_mentions(sender, instance, created, **kwargs):
    if created:
        content = instance.content
        mentioned_users = User.objects.filter(email__in=extract_mentions(content))

        for user in mentioned_users:
            if user != instance.user:  # avoid notifying self
                Notification.objects.create(
                    user=user,
                    content=f"You were mentioned in a feed by {instance.user.email}",
                    type="mention",
                    created_at=now()
                )

def extract_mentions(content):
    """
    Dummy mention extractor: look for '@email' pattern.
    Replace with real parsing logic as needed.
    """
    import re
    matches = re.findall(r'@([\w\.-]+@[\w\.-]+)', content)
    return matches
