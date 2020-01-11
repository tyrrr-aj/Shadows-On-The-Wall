from revolution.models import Problem, Tag, Comment, AppUser, Entry
from revolution.serializers import ProblemSerializer, NewProblemSerializer, TagSerializer,\
    CommentSerializer, AppUserDetailsSerializer
from rest_framework import generics


class ProblemDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Problem.objects.all()
    serializer_class = NewProblemSerializer


class NewProblem(generics.CreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = NewProblemSerializer


class AddCommentMixin:
    def add_comment(self, entry, content):
        comment = Comment(**content)
        entry.add_comment(comment)


class AddCommentToProblem(generics.CreateAPIView, AddCommentMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        entry = kwargs["pk"]
        AddCommentMixin.add_comment(entry, *args)
        return self.create(request, *args, **kwargs)


class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NewTag(generics.CreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class AppUserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserDetailsSerializer


