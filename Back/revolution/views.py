from rest_framework import generics, viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from revolution.models import Problem, Initiative, Tag
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer, GraphSerializer

class ProblemDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Problem.objects.all()
    serializer_class = NewProblemSerializer


class NewProblem(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = NewProblemSerializer


class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NewTag(generics.CreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class GraphViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['GET'])
    def retrieve_problem(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        serializer = GraphSerializer()
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def retrieve_initiative(self, request, pk):
        initiative = get_object_or_404(Initiative, pk=pk)
        serializer = GraphSerializer()
        return Response(serializer.data)


problem_graph = GraphViewSet.as_view({'get': 'retrieve'})
initiative_graph = GraphViewSet.as_view({'get': 'retrieve'})
