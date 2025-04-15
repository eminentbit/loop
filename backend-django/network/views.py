from django.shortcuts import render
from rest_framework import viewsets, permissions
# network/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from .models import Follow, Newsletter, Page, Event, Profile, Subscriber
from .serializers import EventSerializer, FollowSerializer, NewsletterSerializer, PageSerializer, ProfileSerializer, SubscriberSerializer, UserAccountSerializer

class UserListAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        serializer = UserAccountSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)

class FollowToggleAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        target_id = request.data.get('user_id')
        try:
            target = User.objects.get(id=target_id)
        except User.DoesNotExist:
            return Response({'detail':'User not found'}, status=404)

        obj, created = Follow.objects.get_or_create(
            follower=request.user, following=target
        )
        if not created:
            obj.delete()
            return Response({'following': False})
        return Response({'following': True})
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [AllowAny]  # So guests can subscribe

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [AllowAny]

