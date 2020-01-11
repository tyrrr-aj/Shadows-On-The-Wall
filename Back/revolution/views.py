from revolution.models import Problem, Tag, Comment, AppUser, Entry
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer,\
    CommentSerializer, AppUserDetailsSerializer
from rest_framework import generics
from rest_framework import mixins
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from revolution.models import Problem, Initiative, Tag
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer, GraphSerializer


class ProblemViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_problem(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)

problem_details = ProblemViewSet.as_view({'get': 'retrieve_problem'})


class NewProblem(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = NewProblemSerializer


class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NewTag(generics.CreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# class CommentList(generics.ListAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#
#
# class AddCommentMixin(generics.CreateAPIView, Entry):
#     queryset = Comment.objects.all()
#     Entry.add_comment(Entry, queryset)
#     serializer_class = CommentSerializer


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
