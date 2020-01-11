from django.urls import path
from revolution import views

urlpatterns = [
    path('problem/<int:pk>', views.problemDetails.as_view())
]