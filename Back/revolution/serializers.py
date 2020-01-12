from rest_framework import serializers
from revolution.models import Problem, AppUser, Tag


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'date_time', 'comments', 'votes', 'tags', 'solutions']


class NewProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'user', 'title', 'description', 'tags']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class NodeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    type = serializers.CharField(required=False)
    votes = serializers.IntegerField()
    date = serializers.DateTimeField()


class EdgeSerializer(serializers.Serializer):
    start = serializers.IntegerField()
    end = serializers.IntegerField()
    start_type = serializers.CharField(required=False)
    end_type = serializers.CharField(required=False)


class GraphSerializer(serializers.Serializer):
    root = NodeSerializer()
    nodes = NodeSerializer(many=True)
    edges = serializers.ListSerializer(
        child=EdgeSerializer()
    )
