from django.urls import path
from revolution import views


urlpatterns = [
    path('graph/<int:pk>', views.graph),
]
