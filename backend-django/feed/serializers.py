from rest_framework import serializers # type: ignore
from .models import Feed, Comment, Report
from django.db.models import Count

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    reports_count = serializers.SerializerMethodField()
    is_liked_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'content', 'created_at',
            'likes_count', 'reports_count', 'is_liked_by_user'
        ]
        read_only_fields = ['likes_count', 'reports_count', 'is_liked_by_user']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_reports_count(self, obj):
        return obj.reports.count()

    def get_is_liked_by_user(self, obj):
        user = self.context['request'].user
        return user.is_authenticated and obj.likes.filter(id=user.id).exists()

class FeedSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked_by_user = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Feed
        fields = [
            'id', 'user', 'type', 'title', 'content', 'image', 'video_url',
            'event_date', 'live_url', 'created_at', 'updated_at',
            'likes_count', 'likes', 'comments', 'comments_count', 'is_liked_by_user'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at', 'likes', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked_by_user(self, obj):
        user = self.context['request'].user
        return user.is_authenticated and obj.likes.filter(id=user.id).exists()

    def get_comments(self, obj):
        request = self.context.get('request')
        comments_qs = obj.comments.filter(is_deleted=False).annotate(
            likes_count=Count('likes')
        ).order_by('-likes_count')  # You can change this to created_at if needed
        return CommentSerializer(comments_qs, many=True, context={'request': request}).data


class ReportSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'user', 'reason', 'created_at']
        read_only_fields = ['user', 'created_at']
        unique_together = ('feed', 'reporter')