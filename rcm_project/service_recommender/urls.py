
# from django.urls import path
# from .views import recommendation_api
# from .views import TopAndBottomEarners
# from .views import UniqueStateNames
# from .views import DataAnalysisAPI
# # from .views import ExactMatchRecommender  # Uncomment this line to include the view

# urlpatterns = [
#     path('recommendation/', recommendation_api.as_view(), name='recommendations'),
#     path('top_ten_revenue_earners/', TopAndBottomEarners.as_view(), name='earners'),
#     path('unique-states/', UniqueStateNames.as_view(), name='unique_states'),
#     path('data-analysis/', DataAnalysisAPI.as_view(), name='data_analysis_api'),
# ]


from django.urls import path
from .views import recommendation_api
from .views import TopAndBottomEarners
from .views import UniqueStateNames
from .views import DataAnalysisAPIView
from .views import ExactMatchRecommender

urlpatterns = [
    path('recommendation/', recommendation_api.as_view(), name='recommendations'),
    path('top_ten_revenue_earners/', TopAndBottomEarners.as_view(), name='earners'),
    path('unique-states/', UniqueStateNames.as_view(), name='unique_states'),
    path('data-analysis/', DataAnalysisAPIView.as_view(), name='data_analysis_api'),
    path('exact-match/', ExactMatchRecommender.as_view(), name='exact_match_recommender'),
]
