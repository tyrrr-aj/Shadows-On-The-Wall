from django.urls import path
from revolution import views


urlpatterns = [
    path('problem/<int:pk>', views.problem_details),
    path('problem/<int:pk>/graph', views.problem_graph),
    path('problem/new', views.NewProblem.as_view()),
    path('tags/new', views.NewTag.as_view()),
    path('tags', views.retrieve_filtered_tags),
    # path('tags?name', views.retrieve_filtered_tags),
    path('problem/<int:pk>/add_comment', views.AddCommentToProblem.as_view()),
    path('initiative/<int:pk>/add_comment', views.AddCommentToInitiative.as_view()),
    path('solution/<int:pk>/add_comment', views.AddCommentToSolution.as_view()),
    path('comments/<int:pk>', views.CommentList.as_view()),
    path('user/<int:pk>', views.AppUserDetails.as_view()),
    path('initiative/<int:pk>/graph', views.initiative_graph),

]

