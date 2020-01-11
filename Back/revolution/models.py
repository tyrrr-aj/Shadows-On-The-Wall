from django.db import models

# Create your models here.


class AppUser(models.Model):  # django.contrib.auth.User
    pass


class Comment(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.SET_NULL)
    text = models.CharField()
    date = models.DateField()


class Entry(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.SET_NULL)

    title = models.CharField()
    description = models.CharField()
    date = models.DateField()

    comments = models.ManyToManyField(Comment)

    votes = models.IntegerField()

    def upvote(self):
        pass

    def downvote(self):
        pass


class Problem(Entry):
    solutions = models.ManyToManyField('Solution')


class Solution(Entry):
    children = models.ManyToManyField('self')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class Initiative(Entry):
    children = models.ManyToManyField('self')
