from django.conf import settings
from rest_framework import serializers
from .models import UserAccount
# from django.contrib.auth import get_user_model

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = [
            'id', 'email', 'full_name', 'role',
            # Recruiter fields
            'company_name', 'company_role', 'industry', 'company_size', 'additional_info',
            # Jobseeker/Investor fields
            'current_job_title', 'experience_level', 'primary_skills', 'career_interests', 'location_preference',
        ]
        read_only_fields = ['id', 'email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = [
            'email', 'full_name', 'password', 'role',
            'company_name', 'company_role', 'industry', 'company_size', 'additional_info',
            'current_job_title', 'experience_level', 'primary_skills', 'career_interests', 'location_preference'
        ]

    def validate(self, data):
        role = data.get('role')

        if role == 'recruiter':
            required_fields = ['company_name', 'company_role', 'industry', 'company_size']
        elif role in ['jobseeker', 'investor']:
            required_fields = ['current_job_title', 'experience_level', 'primary_skills']
        else:
            raise serializers.ValidationError("Invalid role.")

        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError(f"{field} is required for role {role}.")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserAccount.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    