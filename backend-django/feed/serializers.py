from rest_framework import serializers # type: ignore
from .models import Feed, Comment

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']

class FeedSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)
    def get_is_liked_by_user(self, obj):
        user = self.context['request'].user
        return user in obj.likes.all()

    class Meta:
        model = Feed
        fields = [
            'id', 'user', 'type', 'title', 'content', 'image', 'video_url',
            'event_date', 'live_url', 'created_at', 'updated_at',
            'likes_count', 'likes', 'comments', 'comments_count'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at', 'likes', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()

