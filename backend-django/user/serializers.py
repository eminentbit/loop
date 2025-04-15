from django.conf import settings
from rest_framework import serializers # type: ignore
from .models import UserAccount
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'fullName', 'role',
            # Recruiter fields
            'companyName', 'companyRole', 'industry', 'companySize', 'additionalInfo',
            # Jobseeker/Investor fields
            'currentJobTitle', 'experienceLevel', 'primarySkills', 'careerInterests', 'locationPreference',
        ]
        read_only_fields = ['id', 'email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            'email', 'fullName', 'password', 'role',
            'companyName', 'companyRole', 'industry', 'companySize', 'additionalInfo',
            'currentJobTitle', 'experienceLevel', 'primarySkills', 'careerInterests', 'locationPreference'
        ]

    def validate(self, data):
        role = data.get('role')

        if role == 'recruiter':
            required_fields = ['companyName', 'companyRole', 'industry', 'companySize']
        elif role in ['jobseeker', 'investor']:
            required_fields = ['currentJobTitle', 'experienceLevel', 'primarySkills']
        else:
            raise serializers.ValidationError("Invalid role.")

        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError(f"{field} is required for role {role}.")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    