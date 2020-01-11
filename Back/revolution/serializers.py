from rest_framework import serializers


class NodeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    votes = serializers.IntegerField()
    date = serializers.DateTimeField()


class GraphSerializer(serializers.Serializer):
    root = NodeSerializer()
    nodes = NodeSerializer()
    edges = serializers.ListSerializer(
        child=serializers.ListSerializer(
            child=serializers.IntegerField()
        ))
