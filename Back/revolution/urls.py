from django.urls import path
from revolution import views


urlpatterns = [
    path('problem/new', views.AddProblem.as_view()),
    path('problem/<int:pk>', views.problem_details),
    path('problem/<int:pk>/graph', views.problem_graph),
    path('problem/<int:pk>/add_comment', views.AddCommentToProblem.as_view()),

    path('solution/<int:pk>', views.retrieve_solution),
    path('solution/<int:pk>/add_comment', views.AddCommentToSolution.as_view()),

    path('initiative/<int:pk>/graph', views.initiative_graph),
    path('initiative/<int:pk>/add_comment', views.AddCommentToInitiative.as_view()),

    path('tags/new', views.NewTag.as_view()),
    path('tags', views.retrieve_filtered_tags),

    path('comments/<int:pk>', views.CommentList.as_view()),

    path('user/<int:pk>', views.AppUserDetails.as_view()),
]

