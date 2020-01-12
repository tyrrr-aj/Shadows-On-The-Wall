from rest_framework import serializers

from revolution.models import Problem, AppUser, Tag, Comment, Solution


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class TagListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['pk']


class AppUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['username']


class AppUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['pk', 'first_name', 'last_name', 'email']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all())

    class Meta:
        model = Comment
        fields = ['user', 'text']


class CommentReadOnlySerializer(serializers.Serializer):
    author = serializers.CharField(source='user')
    text = serializers.CharField(max_length=5000)


class SolutionSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    author = serializers.CharField(source='solution.user')
    comments = serializers.ListSerializer(
        child=CommentReadOnlySerializer(
            source='problem.comment'
        )
    )
    improvement_of = serializers.IntegerField(source='get_improvement_of_id')


class ProblemSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    author = serializers.CharField(source='problem.user')
    tags = serializers.ListSerializer(
        child=serializers.CharField(
            source='tag.name'
        ))
    comments = serializers.ListSerializer(
        child=CommentReadOnlySerializer(
            source='problem.comment'
        )
    )
    solutions = serializers.ListSerializer(
        child=SolutionSerializer(
            source='problem.solution'
        )
    )


class NewProblemSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all(), label="author")

    class Meta:
        model = Problem
        fields = ['user', 'title', 'description']


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
