from django.contrib import admin
from .models import Comment, Tag, Problem, Solution, Initiative, AppUser


# Register your models here.
admin.site.register((Comment, Tag, Problem, Solution, Initiative, AppUser))
