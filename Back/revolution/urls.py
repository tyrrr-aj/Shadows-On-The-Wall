from django.urls import path
from revolution import views


urlpatterns = [
    path('problem/<int:pk>', views.ProblemDetails.as_view()),
    path('problem/<int:pk>/graph', views.problem_graph),
    path('problem/new', views.NewProblem.as_view()),
    path('tag/new', views.NewTag.as_view()),
    path('tags/<int:pk>', views.TagList.as_view()),
    path('initiative/<int:pk>/graph', views.initiative_graph),
]
