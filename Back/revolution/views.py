from revolution.models import Problem, Tag, Comment, AppUser, Entry
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer,\
    CommentSerializer, AppUserDetailsSerializer
from rest_framework import generics
from rest_framework import mixins


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


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class AddCommentMixin(generics.CreateAPIView, Entry):
    queryset = Comment.objects.all()
    Entry.add_comment(Entry, queryset)
    serializer_class = CommentSerializer


class AppUserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserDetailsSerializer


