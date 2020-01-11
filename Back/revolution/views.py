from revolution.models import Problem
from revolution.serializers import ProblemSerializer
from rest_framework import generics


class ProblemDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer


class NewProblem(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
