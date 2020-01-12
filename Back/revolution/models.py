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
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Entry(models.Model):
    user = models.ForeignKey(AppUser, null=True, on_delete=models.SET_NULL)

    title = models.CharField(max_length=300)
    description = models.CharField(max_length=5000)
    date_time = models.DateTimeField(default=datetime.datetime.now())  # default=datetime.datetime.now)

    comments = models.ManyToManyField(Comment, blank=True, default=None)
    # TODO: on delete entry - delete comments!

    votes = models.IntegerField(default=0)

    def upvote(self):
        pass

    def downvote(self):
        pass

    def add_comment(self, comment):
        comm = self.comments.add(comment)

    def __str__(self):
        return self.title


class Problem(Entry):
    solutions = models.ManyToManyField('Solution', blank=True, default=None)
    # TODO: on delete entry - delete solutions!

    tags = models.ManyToManyField(Tag, default=None)

    def get_graph(self):
        date = self.date_time.ctime()
        votes = self.votes
        root = Node(self.pk, votes, date, 'problem')

        # Build graph.
        graph = Graph(root)

        subgraphs = []
        for s in self.solutions.all():
            subgraphs.append(s.get_graph(node_type='solution'))

        # Merge subgraphs and add edges linking root with roots of subgraphs.
        for sub in subgraphs:
            graph.nodes.append(sub.root)
            graph.nodes.extend(sub.nodes)
            graph.edges.extend(sub.edges)
            edge = Edge(root.pk, sub.root.pk, 'problem', 'solution')
            graph.edges.append(edge)

        return graph


class TraversableMixin:
    def get_graph(self, node_type=None):
        date = self.date_time.ctime()
        votes = self.votes
        root = Node(self.pk, votes, date, node_type)

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
                if node_type:
                    new_node = Node(c.pk, votes, date, node_type)
                    new_edge = Edge(cur_node.pk, c.pk, node_type, node_type)
                else:
                    new_node = Node(c.pk, votes, date)
                    new_edge = Edge(cur_node.pk, c.pk)

                graph.nodes.append(new_node)
                graph.edges.append(new_edge)

        return graph


class Solution(Entry, TraversableMixin):
    improvements = models.ManyToManyField('self', blank=True, default=None)
    source_problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    improvement_of = models.ForeignKey('self', null=True, blank=True, default=None, on_delete=models.SET_NULL)

    def get_improvement_of_id(self):
        if self.improvement_of is None:
            return None
        else:
            return self.improvement_of.pk


class Initiative(Entry, TraversableMixin):
    tags = models.ManyToManyField(Tag)

    improvement_of = models.ForeignKey('self', null=True, blank=True, default=None, on_delete=models.SET_NULL)

    def get_improvement_of_id(self):
        if self.improvement_of is None:
            return None
        else:
            return self.improvement_of.pk

    def get_subinitiatives(self):
        return Initiative.objects.filter(improvement_of=self)


class Node:
    def __init__(self, pk, votes, date, node_type=None):
        self.pk = pk
        if node_type:
            self.type = node_type
        self.votes = votes
        self.date = date


class Edge:
    def __init__(self, start, end, start_type=None, end_type=None):
        self.start = start
        if start_type:
            self.start_type = start_type
        self.end = end
        if end_type:
            self.end_type = end_type


class Graph:
    def __init__(self, root):
        self.root = root
        self.nodes = []
        self.edges = []
