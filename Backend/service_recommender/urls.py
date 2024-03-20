# myapp/urls.py
from django.urls import path
from .views import recommendation_api

urlpatterns = [
    path('recommendations/', recommendation_api.as_view(), name='recommendations'),
]
