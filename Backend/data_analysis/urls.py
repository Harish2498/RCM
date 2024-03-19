# from django.urls import path
# from data_analysis import views

# urlpatterns = [
#     path('drug-services/', views.get_drug_services_info, name='drug_services'),
#     path('cities/', views.total_cities_info, name='cities'),
#     path('states/', views.total_states_info, name='states'),
#     path('providers/', views.unique_providers_info, name='providers'),
# ]




from django.urls import path
# from .views import data_analysis
from .views import services_api


urlpatterns = [
    path('services/', services_api, name='services_api'),
]
