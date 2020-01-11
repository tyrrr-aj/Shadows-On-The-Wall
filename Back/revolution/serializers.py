from rest_framework import serializers
from revolution.models import Problem, AppUser, Tag


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'date_time', 'comments', 'votes', 'tags', 'solutions']


class NewProblemSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all())

    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'tags']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']