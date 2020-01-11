import datetime
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class AppUser(User):
    class Meta:
        proxy = True


class Comment(models.Model):
    user = models.ForeignKey(AppUser, null=True, on_delete=models.SET_NULL)
    text = models.CharField(max_length=5000)
    date_time = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.text


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Entry(models.Model):
    user = models.ForeignKey(AppUser, null=True, on_delete=models.SET_NULL)

    title = models.CharField(max_length=300)
    description = models.CharField(max_length=5000)
    date_time = models.DateTimeField(default=datetime.datetime.now)

    comments = models.ManyToManyField(Comment, blank=True, default=None)
    # TODO: on delete entry - delete comments!

    votes = models.IntegerField(default=0)

    def upvote(self):
        pass

    def downvote(self):
        pass

    def add_comment(self, comment):
        comm = self.comments.add(comment)
        comm.save()

    def __str__(self):
        return self.title


class Problem(Entry):
    solutions = models.ManyToManyField('Solution', blank=True, default=None)
    # TODO: on delete entry - delete solutions!

    tags = models.ManyToManyField(Tag)

    def get_graph(self):
        date = self.date_time.ctime()
        votes = self.votes
        root = Node(self.pk, votes, date)

        # Build graph.
        graph = Graph(root)

        subgraphs = []
        for s in self.solutions.all():
            subgraphs.append(s.get_graph())

        # Merge subgraphs and add edges linking root with roots of subgraphs.
        for sub in subgraphs:
            graph.nodes.append(sub.root)
            graph.nodes.extend(sub.nodes)
            graph.edges.extend(sub.edges)
            graph.edges.append((root.pk, sub.root.pk))

        return graph


class TraversableMixin:
    def get_graph(self):
        date = self.date_time.ctime()
        votes = self.votes
        root = Node(self.pk, votes, date)

        # Build graph.
        graph = Graph(root)

        q = [self]
        visited = {self}

        while q:
            cur_node = q.pop()
            children = cur_node.improvements.all()

            for c in children:
                if c in visited:
                    continue
                visited.add(c)
                q.append(c)

                # Update graph.
                date = self.date_time.ctime()
                votes = self.votes
                new_node = Node(c.pk, votes, date)
                graph.nodes.append(new_node)
                graph.edges.append((cur_node.pk, c.pk))

        return graph


class Solution(Entry, TraversableMixin):
    improvements = models.ManyToManyField('self', blank=True, default=None)
    source_problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class Initiative(Entry, TraversableMixin):
    improvements = models.ManyToManyField('self', blank=True, default=None)

    tags = models.ManyToManyField(Tag)


class Node:
    def __init__(self, pk, votes, date):
        self.pk = pk
        self.votes = votes
        self.date = date


class Graph:
    def __init__(self, root):
        self.root = root
        self.nodes = []
        self.edges = []
