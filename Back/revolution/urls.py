from django.urls import path
from revolution import views

urlpatterns = [
    path('problem/<int:pk>', views.ProblemDetails.as_view()),
    path('problem/new', views.NewProblem.as_view()),
    path('tag/new', views.NewTag.as_view()),
    path('tags/<int:pk>', views.TagList.as_view()),
    path('problem/<int:pk>/add_comment', views.AddCommentToProblem.as_view()),
    path('comments/<int:pk>', views.CommentList.as_view()),
    path('user/<int:pk>', views.AppUserDetails.as_view())
]