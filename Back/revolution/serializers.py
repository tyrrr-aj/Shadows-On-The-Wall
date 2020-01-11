from rest_framework import serializers

from revolution.models import Problem, AppUser, Tag, Comment
from datetime import datetime


class NewProblemSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all())

    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'tags']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['pk']


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['username']


class AppUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['pk', 'first_name', 'last_name', 'email']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['user', 'text', 'date_time']


class ProblemSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    user = AppUserNameSerializer()


class NodeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    votes = serializers.IntegerField()
    date = serializers.DateTimeField()


class GraphSerializer(serializers.Serializer):
    root = NodeSerializer()
    nodes = NodeSerializer(many=True)
    edges = serializers.ListSerializer(
        child=serializers.ListSerializer(
            child=serializers.IntegerField()
        ))
