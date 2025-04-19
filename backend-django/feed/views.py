from rest_framework import viewsets, permissions, status  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework.decorators import action  # type: ignore
from django.shortcuts import get_object_or_404
from .models import Feed, Comment, Report
from django.db.models import Count
from .serializers import FeedSerializer, CommentSerializer

class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by('-created_at')
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Filter by feed type if provided
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
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        else:
            feed.likes.add(user)
            return Response({'status': 'liked'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def comment(self, request, pk=None):
        feed = self.get_object()
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Comment content is required.'}, status=status.HTTP_400_BAD_REQUEST)
        comment = Comment.objects.create(feed=feed, user=request.user, content=content)
        feed.comments_count = feed.comments.filter(is_deleted=False).count()
        feed.save()
        return Response(
            CommentSerializer(comment, context={'request': request}).data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['get'])
    def comment_counts(self, request):
        comment_counts = Feed.objects.annotate(
            comment_count=Count('comments')
        ).values('id', 'comment_count')
        return Response(comment_counts, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def list_comments(self, request, pk=None):
        feed = self.get_object()
        comments = Comment.objects.filter(feed=feed).order_by('-created_at')
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def report(self, request, pk=None):
        feed = self.get_object()
        reason = request.data.get('reason')
        description = request.data.get('description', '')
        if not reason:
            return Response({'error': 'Reason is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        report = Report.objects.create(
            feed=feed,
            reporter=request.user,
            reason=reason,
            description=description
        )
        return Response({'status': 'reported'}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def delete_comment(self, request, pk=None):
        feed = self.get_object()
        comment_id = request.data.get('comment_id')
        comment = get_object_or_404(Comment, id=comment_id, feed=feed)
        
        if comment.user != request.user:
            return Response({'error': 'You do not have permission to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)
        
        comment.delete()
        return Response({'status': 'comment deleted'}, status=status.HTTP_204_NO_CONTENT)


class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def comment_count(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        count = Comment.objects.filter(feed=comment.feed).count()
        return Response({'count': count}, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        if comment.user != request.user:
            return Response({'error': 'You can only delete your own comments.'}, status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response({'status': 'Comment deleted.'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def report(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        reason = request.data.get('reason')
        if not reason:
            return Response({'error': 'Report reason is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Stub: Save the report (you can link to a Report model later)
        # For now, we just acknowledge it
        print(f"User {request.user} reported comment {pk} for: {reason}")
        return Response({'status': 'Comment reported.'}, status=status.HTTP_200_OK)
    


class ReportViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Report.objects.all().order_by('-created_at')

    def list(self, request):
        queryset = self.get_queryset()
        feed_id = request.query_params.get('feed_id')
        if feed_id:
            queryset = queryset.filter(feed_id=feed_id)
        return Response({'reports': self.get_serializer(queryset, many=True).data})

    def retrieve(self, request, pk=None):
        report = get_object_or_404(Report, pk=pk)
        return Response(self.get_serializer(report).data)

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        report = get_object_or_404(Report, pk=pk)
        report.resolved = True
        report.resolved_by = request.user
        report.save()
        return Response({'status': 'report resolved'})