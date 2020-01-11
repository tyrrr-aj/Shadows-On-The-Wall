from django.urls import path
from revolution import views

urlpatterns = [
    path('problem/<int:pk>', views.ProblemDetails.as_view()),
    path('problem/new', views.NewProblem.as_view()),
]