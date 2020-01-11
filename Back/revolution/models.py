from django.db import models

# Create your models here.


class AppUser(models.Model):  # django.contrib.auth.User
    pass


class GraphNode(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE)


class Entry(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.SET_NULL)

    title = models.CharField()
    description = models.CharField()
    date = models.DateField()

    votes = models.IntegerField()

    def upvote(self):
        pass

    def downvote(self):
        pass


class Problem(GraphNode, Entry):
    pass


class Solution(GraphNode, Entry):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class Initiative(GraphNode, Entry):
    pass


class Comment(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.SET_NULL)
    text = models.CharField()
    date = models.DateField()
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)

    