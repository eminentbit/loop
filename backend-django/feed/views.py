from rest_framework import viewsets, permissions, status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.decorators import action # type: ignore
from .models import Feed, Comment
from .serializers import FeedSerializer, CommentSerializer
from django.shortcuts import get_object_or_404

class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by('-created_at')
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Optional: filter by type
        feed_type = request.query_params.get('type')
        if feed_type:
            queryset = queryset.filter(type=feed_type)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        feed = self.get_object()
        user = request.user
        if user in feed.likes.all():
            feed.likes.remove(user)
            return Response({'status': 'unliked'})
        else:
            feed.likes.add(user)
            return Response({'status': 'liked'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def comment(self, request, pk=None):
        feed = self.get_object()
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Comment content is required.'}, status=status.HTTP_400_BAD_REQUEST)
        comment = Comment.objects.create(feed=feed, user=request.user, content=content)
        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

