from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Follow

class UserSerializer(serializers.ModelSerializer):
    avatar   = serializers.CharField(source='profile.avatar', read_only=True)
    verified = serializers.BooleanField(source='profile.verified', read_only=True)
    following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','avatar','verified','following')

    def get_following(self, obj):
        req = self.context.get('request')
        if req and req.user.is_authenticated:
            return Follow.objects.filter(follower=req.user, following=obj).exists()
        return False
