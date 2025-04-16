from rest_framework import serializers # type: ignore
from django.contrib.auth.models import User
from .models import Profile, Follow

from rest_framework import serializers # type: ignore
from django.contrib.auth import get_user_model
from .models import  Follow, Page, Event, Subscriber, Newsletter
from user.serializers import UserAccountSerializer

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'avatar', 'verified']

class FollowSerializer(serializers.ModelSerializer):
    follower = UserAccountSerializer(read_only=True)
    following = UserAccountSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created']

class PageSerializer(serializers.ModelSerializer):
    author = UserAccountSerializer(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Page
        fields = ['id', 'title', 'slug', 'content', 'author', 'is_published', 'created_at', 'updated_at']

class EventSerializer(serializers.ModelSerializer):
    organizer = UserAccountSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'start_time', 'end_time', 'location', 'organizer', 'is_public', 'created_at', 'updated_at']

class SubscriberSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer(read_only=True)

    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'user', 'subscribed_at']

class NewsletterSerializer(serializers.ModelSerializer):
    subscribers = SubscriberSerializer(many=True, read_only=True)

    class Meta:
        model = Newsletter
        fields = ['id', 'subject', 'body', 'send_date', 'is_sent', 'subscribers', 'created_at', 'updated_at']

