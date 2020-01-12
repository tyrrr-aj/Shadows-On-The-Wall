from django.http import HttpResponse

from revolution.models import Problem, Tag, Comment, AppUser, Entry, Initiative, Solution
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer,\
    CommentSerializer, AppUserDetailsSerializer, GraphSerializer, SolutionSerializer, \
    InitiativeSerializer, SubmissionSerializer

from rest_framework import generics, viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


class SolutionViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_solution(self, request, pk):
        solution = get_object_or_404(Solution, pk=pk)
        serializer = SolutionSerializer(solution)
        return Response(serializer.data)


retrieve_solution = SolutionViewSet.as_view({'get': 'retrieve_solution'})


class ProblemViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_problem(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)


@api_view(['POST'])
def add_problem(request):
    if request.method == 'POST':
        problem = Problem.objects.create(user=AppUser.objects.get(pk=request.data['author']),
                               title=request.data['title'],
                               description=request.data['description'],
                               )
        for tag_name in request.data['tags']:
            if Tag.objects.get(name=tag_name):
                Tag.objects.create(name=tag_name)
            problem.tags.add(Tag.objects.get(name=tag_name))

        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


problem_details = ProblemViewSet.as_view({'get': 'retrieve_problem'})


class InitiativeViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_initiative(self, request, pk):
        initiative = get_object_or_404(Initiative, pk=pk)
        serializer = InitiativeSerializer(initiative)
        return Response(serializer.data)


initiative_details = InitiativeViewSet.as_view({'get': 'retrieve_initiative'})


@api_view(['POST'])
def add_initiative(request):
    if request.method == 'POST':
        parameters = {
            'user': AppUser.objects.get(pk=request.data['author']),
            'title': request.data['title'],
            'description': request.data['description'],
        }
        if 'improvement_of' in request.data.keys():
            origin = Initiative.objects.get(pk=request.data['improvement_of'])
            parameters['improvement_of'] = origin
        initiative = Initiative.objects.create(**parameters)
        for tag_name in request.data['tags']:
            initiative.tags.add(Tag.objects.get(name=tag_name))
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class AddCommentMixin:
    def add_comment(self, entry, content):
        serializer = CommentSerializer(data=content)
        if serializer.is_valid():
            comment = serializer.save()
            entry.add_comment(comment)


class AddCommentToProblem(generics.CreateAPIView, AddCommentMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        entry = get_object_or_404(Problem, pk=kwargs["pk"])
        self.add_comment(entry, request.data)
        return HttpResponse(status=200)


class AddCommentToInitiative(generics.CreateAPIView, AddCommentMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        entry = get_object_or_404(Initiative, pk=kwargs["pk"])
        self.add_comment(entry, request.data)
        return HttpResponse(status=200)


class AddCommentToSolution(generics.CreateAPIView, AddCommentMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        entry = get_object_or_404(Solution, pk=kwargs["pk"])
        self.add_comment(entry, request.data)
        return HttpResponse(status=200)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    @action(detail=True, methods=['GET'])
    def retrieve_filtered_tags(self, request):
        queryset = Tag.objects.all()
        phrase = self.request.query_params.get('name', None)
        if phrase is not None:
            queryset = queryset.filter(name__contains=phrase)
        return Response(list(queryset.values_list('name', flat=True)))


class NewTag(generics.CreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


retrieve_all_tags = TagViewSet.as_view({'get': 'retrieve_all_tags'})
retrieve_filtered_tags = TagViewSet.as_view({'get': 'retrieve_filtered_tags'})


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class AppUserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserDetailsSerializer


class GraphViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_problem(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        serializer = GraphSerializer(problem.get_graph())
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def retrieve_initiative(self, request, pk):
        initiative = get_object_or_404(Initiative, pk=pk)
        serializer = GraphSerializer(initiative.get_graph())
        return Response(serializer.data)


problem_graph = GraphViewSet.as_view({'get': 'retrieve_problem'})
initiative_graph = GraphViewSet.as_view({'get': 'retrieve_initiative'})


class SubmissionsViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_submissions(self, request):
        problems = Problem.objects.only('pk', 'user', 'title', 'description', 'votes', 'date_time', 'tags')
        initiatives = Initiative.objects.only('pk', 'user', 'title', 'description', 'votes', 'date_time', 'tags')
        submissions = problems.union(initiatives)
        submissions = set(submissions)
        # given_tags = self.request.query_params.get('tags', None)
        # if given_tags:
        #     given_tags = set(given_tags.split(chr(18))[0].split('\x18'))
        #     submissions = filter(lambda submission: given_tags & set(submission.tags), submissions)
        # sort_method = self.request.query_params.get('sort', None)
        # if sort_method:
        #     if sort_method == 'votes':
        #         comparator = lambda submission: submissions.votes
        #     elif sort_method == 'time':
        #         comparator = lambda submission: submission.date_time
        #     else:
        #         return Response(status=status.HTTP_400_BAD_REQUEST)
        #     submissions = sorted(list(submissions), key=comparator)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(status=status.HTTP_400_BAD_REQUEST)


list_submissions = SubmissionsViewSet.as_view({'get': 'retrieve_submissions'})
