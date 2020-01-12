from rest_framework import serializers
from revolution.models import Problem, AppUser, Tag, Comment, Solution, Initiative


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
    author = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all(), source='user')

    class Meta:
        model = Comment
        fields = ['author', 'text']


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


class SubinitiativeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    author = serializers.CharField(source='initiative.user')
    tags = serializers.ListSerializer(
        child=serializers.CharField(
            source='tag.name'
        ))
    comments = serializers.ListSerializer(
        child=CommentReadOnlySerializer(
            source='initiative.comment'
        )
    )
    improvement_of = serializers.IntegerField(source='get_improvement_of_id')


class InitiativeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    author = serializers.CharField(source='initiative.user')
    improvement_of = serializers.PrimaryKeyRelatedField(queryset=Initiative.objects.all())
    tags = serializers.ListSerializer(
        child=serializers.CharField(
            source='tag.name'
        ))
    comments = serializers.ListSerializer(
        child=CommentReadOnlySerializer(
            source='initiative.comment'
        )
    )
    subinitiatives = serializers.ListSerializer(
        child=SubinitiativeSerializer(), source='get_subinitiatives'
    )


class NewProblemSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all(), label="author")

    class Meta:
        model = Problem
        fields = ['user', 'title', 'description']


class NodeSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    type = serializers.CharField(required=False)
    votes = serializers.IntegerField()
    date = serializers.DateTimeField(source='get_formatted_date')
    metric = serializers.IntegerField(source='get_metric')


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


class SubmissionSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    type = serializers.CharField(max_length=1)
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=5000)
    date_time = serializers.DateTimeField()
    votes = serializers.IntegerField()
    author = serializers.CharField(source='user')
    tags = serializers.ListSerializer(
        child=serializers.CharField(
            source='tag.name'
        ))
