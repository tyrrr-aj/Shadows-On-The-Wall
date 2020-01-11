from rest_framework import serializers
from revolution.models import Problem, AppUser

from datetime import datetime


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'date', 'comments', 'votes', 'tags', 'solutions']


class NewProblemSerializer(serializers.Serializer):
    userId = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)

    def create(self, validated_data):
        user = AppUser.objects.get(pk=self.userId)
        title = validated_data['title']
        description = validated_data['description']
        votes = 0
        comments
        return Problem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return instance
