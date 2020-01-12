from django.urls import path
from revolution import views


urlpatterns = [
    path('submissions', views.list_submissions),

    path('problem/new', views.add_problem),
    path('problem/<int:pk>', views.problem_details),
    path('problem/<int:pk>/upvote', views.problem_up),
    path('problem/<int:pk>/downvote', views.problem_down),
    path('problem/<int:pk>/graph', views.problem_graph),
    path('problem/<int:pk>/add_comment', views.AddCommentToProblem.as_view()),
    path('problem/<int:pk>/add_solution', views.add_solution, {'source': 'problem'}),

    path('solution/<int:pk>', views.retrieve_solution),
    path('solution/<int:pk>/upvote', views.solution_up),
    path('solution/<int:pk>/downvote', views.solution_down),
    path('solution/<int:pk>/add_comment', views.AddCommentToSolution.as_view()),
    path('solution/<int:pk>/add_solution', views.add_solution, {'source': 'solution'}),

    path('initiative/new', views.add_initiative),
    path('initiative/<int:pk>', views.initiative_details),
    path('initiative/<int:pk>/upvote', views.initiative_up),
    path('initiative/<int:pk>/downvote', views.initiative_down),
    path('initiative/<int:pk>/graph', views.initiative_graph),
    path('initiative/<int:pk>/add_comment', views.AddCommentToInitiative.as_view()),

    path('tags/new', views.NewTag.as_view()),
    path('tags', views.retrieve_filtered_tags),

    path('comments/<int:pk>', views.CommentList.as_view()),

    path('user/<int:pk>', views.AppUserDetails.as_view()),
]

