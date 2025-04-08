from django.shortcuts import render

# network/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Follow
from .serializers import UserSerializer

class UserListAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        serializer = UserSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)

class FollowToggleAPIView(APIView):
    permission_classes = [IsAuthenticated]
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

