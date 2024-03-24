# myapp/urls.py
from django.urls import path
from .views import recommendation_api
from .views import TopAndBottomEarners
from .views import UniqueStateNames

urlpatterns = [
    path('recommendations/', recommendation_api.as_view(), name='recommendations'),
    path('earners/', TopAndBottomEarners.as_view(), name='earners'),
    path('unique-states/', UniqueStateNames.as_view(), name='unique_states'),
]
