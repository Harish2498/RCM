import re
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.views import APIView
from rest_framework.response import Response
from data_analysis.models import *

def clean(text):
    # Convert to lowercase
    lower_text = text.lower()
    # Tokenization
    tokens = lower_text.split()
    # Remove stopwords
    stop_words = set([
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
        "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
        "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
        "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
        "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
        "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
        "at", "by", "for", "with", "about", "against", "between", "into", "through",
        "during", "before", "after", "above", "below", "to", "from", "up", "down",
        "in", "out", "on", "off", "over", "under", "again", "further", "then", "once"
    ])

    clean_stopwords = [word for word in tokens if word not in stop_words]
    cleaned_text = ' '.join(clean_stopwords)
    # Remove remaining punctuations
    cleaned_text = re.sub(r'[^\w\s]', '', cleaned_text)
    return cleaned_text

def requirement_based_recommender(dataset, user_req):
    df_new = dataset.filter(rndrng_prvdr_ent_cd='O')
    cleaned_user_text = clean(user_req)
    tfidf_vectorizer = TfidfVectorizer()
    HCPCS_Desc_vectors = tfidf_vectorizer.fit_transform(df_new.values_list('hcpcs_desc', flat=True))
    input_vectors = tfidf_vectorizer.transform([cleaned_user_text])
    similarities = cosine_similarity(input_vectors, HCPCS_Desc_vectors)

    # Create a DataFrame to hold the queryset data
    df_results = pd.DataFrame(list(df_new.values()))

    # Add the similarity scores to the DataFrame
    df_results['similarity'] = similarities[0]

    # Filter and sort the DataFrame based on the similarity score
    recommended_providers = df_results[df_results['similarity'] >= 0.1].sort_values(by='similarity', ascending=False).head(10)

    if recommended_providers.empty:
        print("No providers available in the dataset for the given user request.")
        return []
    else:
        return recommended_providers[[
            'rndrng_prvdr_last_org_name', 'rndrng_prvdr_city', 'hcpcs_cd', 'hcpcs_desc',
            'avg_mdcr_pymt_amt', 'avg_mdcr_stdzd_amt'
        ]].to_dict(orient='records')

class recommendation_api(APIView):
    def post(self, request, format=None):
        user_req = request.data.get('user_req', '').strip()
        if not user_req:
            return Response({'error': 'Enter the user request'})

        results = requirement_based_recommender(MedicareData.objects.all(), user_req)
        if not results:
            return Response({'message': 'No results found based on the user requirements'})
        
        return Response(results)

















from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from data_analysis.models import MedicareData
from .models import TopEarner, BottomEarner  
import pandas as pd
import numpy as np

class TopAndBottomEarners(APIView):
    def get(self, request, format=None):
        try:
            # Fetch data from the database using Django ORM
            queryset = MedicareData.objects.all()

            # Convert queryset to DataFrame
            df_org = pd.DataFrame(list(queryset.values()))

            # Data preprocessing
            df_org.drop(['rndrng_npi', 'rndrng_prvdr_first_name', 'rndrng_prvdr_mi', 'rndrng_prvdr_crdntls',
                         'rndrng_prvdr_gndr', 'rndrng_prvdr_st2', 'rndrng_prvdr_state_fips', 'rndrng_prvdr_zip5',
                         'rndrng_prvdr_ruca', 'rndrng_prvdr_ruca_desc', 'rndrng_prvdr_cntry',
                         'rndrng_prvdr_mdcr_prtcptg_ind'], axis=1, inplace=True)

            df_org[['avg_sbmtd_chrg', 'avg_mdcr_alowd_amt', 'avg_mdcr_pymt_amt', 'avg_mdcr_stdzd_amt']] = df_org[
                ['avg_sbmtd_chrg', 'avg_mdcr_alowd_amt', 'avg_mdcr_pymt_amt', 'avg_mdcr_stdzd_amt']].round(2)

            # Convert 'decimal.Decimal' objects to float
            df_org['tot_srvcs'] = df_org['tot_srvcs'].astype(float)
            df_org['avg_mdcr_pymt_amt'] = df_org['avg_mdcr_pymt_amt'].astype(float)

            df_org['total_revenue'] = (df_org['tot_srvcs'] * df_org['avg_mdcr_pymt_amt']).astype('int64')

            df_org['rndrng_prvdr_last_org_name'] = df_org['rndrng_prvdr_last_org_name'].str.replace('[.,]', '').str.lower()

            df_top_rev = df_org.groupby('rndrng_prvdr_last_org_name').agg({'hcpcs_desc': 'unique',
                                                                            'rndrng_prvdr_city': 'unique',
                                                                            'total_revenue': 'sum'}).reset_index()

            df_top_rev = df_top_rev.sort_values(by='total_revenue', ascending=False)

            df_top_rev_top = df_top_rev.head(10)
            df_top_rev_bottom = df_top_rev.tail(10)

            top_earners = df_top_rev_top.to_dict(orient='records')
            bottom_earners = df_top_rev_bottom.to_dict(orient='records')

            # Save the data to TopEarner model
            for earner in top_earners:
                hcpcs_desc = earner['hcpcs_desc'].tolist()  # Convert ndarray to list
                city = earner['rndrng_prvdr_city'].tolist()  # Convert ndarray to list
                
                TopEarner.objects.create(
                    provider_name=earner['rndrng_prvdr_last_org_name'],
                    hcpcs_desc=hcpcs_desc,
                    city=city[0],
                    total_revenue=earner['total_revenue']
                )

            # Save the data to BottomEarner model
            for earner in bottom_earners:
                hcpcs_desc = earner['hcpcs_desc'].tolist()  # Convert ndarray to list
                city = earner['rndrng_prvdr_city'].tolist()  # Convert ndarray to list
                
                BottomEarner.objects.create(
                    provider_name=earner['rndrng_prvdr_last_org_name'],
                    hcpcs_desc=hcpcs_desc,
                    city=city[0],
                    total_revenue=earner['total_revenue']
                )

            return Response({
                'top_earners': top_earners,
                'bottom_earners': bottom_earners
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': f"An error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from data_analysis.models import MedicareData  

class UniqueStateNames(APIView):
    def get(self, request, format=None):
        try:
            # Fetch unique values from the database using Django ORM
            unique_states = MedicareData.objects.values_list('rndrng_prvdr_state_abrvtn', flat=True).distinct()
            unique_hcpcs = MedicareData.objects.values_list('hcpcs_desc', flat=True).distinct()
            unique_cities = MedicareData.objects.values_list('rndrng_prvdr_city', flat=True).distinct()

            # Convert the unique values to lists
            unique_states_list = list(unique_states)
            unique_hcpcs_list = list(unique_hcpcs)
            unique_cities_list = list(unique_cities)

            # Return the unique values with status code
            return Response({
                'status': status.HTTP_200_OK,
                'unique_states': unique_states_list,
                'unique_hcpcs': unique_hcpcs_list,
                'unique_cities': unique_cities_list
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': f"An error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from data_analysis.models import MedicareData

class ExactMatchRecommender(APIView):
    def get(self, request, format=None):
        state = request.GET.get('state', None)
        if not state:
            return Response({"error": "Please provide a state parameter."}, status=status.HTTP_400_BAD_REQUEST)
        cities = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state).values_list('rndrng_prvdr_city', flat=True).distinct()
        if not cities.exists():
            return Response({"error": f"No cities available for the state: {state}"}, status=status.HTTP_404_NOT_FOUND)
        data = []
        for city in cities:
            services = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state, rndrng_prvdr_city__iexact=city).values_list('hcpcs_desc', flat=True).distinct()  
            data.append({
                "city": city,
                "services": list(services),
            })
        return Response({"cities_services": data}, status=status.HTTP_200_OK)





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from data_analysis.models import MedicareData

class MedicareDataAPIView(APIView):
    def get(self, request, format=None):
        # Get all unique states from the database
        states = MedicareData.objects.values_list('rndrng_prvdr_state_abrvtn', flat=True).distinct().order_by('rndrng_prvdr_state_abrvtn')

        # If no specific state is provided, return all states
        if 'state' not in request.GET and 'city' not in request.GET:
            return Response({"states": list(states)}, status=status.HTTP_200_OK)

        state = request.GET.get('state', None)
        city = request.GET.get('city', None)

        if not state:
            return Response({"error": "Please provide a state parameter."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Count the number of times the state appears in the database
        state_count = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state).count()
        
        if state_count == 0:
            return Response({"error": f"No data available for the state: {state}"}, status=status.HTTP_404_NOT_FOUND)

        cities = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state).values_list('rndrng_prvdr_city', flat=True).distinct()

        if city:
            print(request.GET.get("selected_service"))

            city_services = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state, rndrng_prvdr_city__iexact=city).values_list('hcpcs_desc', flat=True).distinct()
            services = list(city_services)
            cities = [city]*len(services)
            if request.GET.get("selected_service"):
                srv = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state, rndrng_prvdr_city__iexact=city,hcpcs_desc__icontains = request.GET.get("selected_service")).last()
                print(srv,">>>>>>>>>")
                services ={
                        "rndrng_prvdr_last_org_name": srv.rndrng_prvdr_last_org_name,
                        "rndrng_prvdr_city": srv.rndrng_prvdr_city,
                        "hcpcs_cd": srv.hcpcs_cd,
                        "hcpcs_desc": srv.hcpcs_desc,
                        "avg_mdcr_pymt_amt": srv.avg_mdcr_pymt_amt,
                        "avg_mdcr_stdzd_amt": srv.avg_mdcr_stdzd_amt
                }

        else:
            services = []
            for city_name in cities:
                city_services = MedicareData.objects.filter(rndrng_prvdr_state_abrvtn__iexact=state, rndrng_prvdr_city__iexact=city_name).values_list('hcpcs_desc', flat=True).distinct()
                services.extend(list(city_services))
        
        return Response({"state": [state]*state_count, "cities": list(cities), "services": services}, status=status.HTTP_200_OK)



































# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import pandas as pd
# import google.generativeai as genai
# from IPython.display import Markdown
# import textwrap
# from .models import BottomEarner, TopEarner  # Import the models
# import numpy as np

# def to_markdown(text):
#     text = text.replace('•', '  *')
#     return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
# @csrf_exempt
# def generate_reports(request):
#     if request.method == "GET":
#         # try:
#         API_KEY = "AIzaSyCL6HnEvAmANH2JOt3twBOxllZHCMKPEYM"
#         genai.configure(api_key=API_KEY)
#         text_model = genai.GenerativeModel('gemini-pro')
#         bottom_earners = BottomEarner.objects.all()  # Fetch data from the database
#         chat = text_model.start_chat()
#         responses = []
#         responses2 = []

#         for obj in bottom_earners:
#             dts = {'Rndrng_Prvdr_Last_Org_Name':obj.provider_name, 'HCPCS_Desc':', '.join(obj.hcpcs_desc) , 'Rndrng_Prvdr_City':obj.city, 'total_revenue':obj.total_revenue }
#             question_to_chat = f": Read the second dataframe. Give a detailed report of the information it contained based on cities, services it is providing, and revenue it is generating {dts}. Print only the name of the city generating the lowest revenue. Do not print the details.?"
#             try:
#                 response_chat = chat.send_message(question_to_chat)
#                 print(response_chat.text)
#                 responses.append(response_chat.text)
#             except:
#                 pass
#         top_earners = TopEarner.objects.all() # Fetch data from the database
#         for obj in top_earners:
#             question_to_chat_2 = "Compare the top revenue-generating city with the lowest revenue-generating cities. Give recommendations to the low revenue-generating cities. Print the response only once."
#             try:
#                 response_chat_2 = chat.send_message(question_to_chat_2)
#                 responses2.append(response_chat_2.text)
#             except:
#                 pass
#         return JsonResponse({'responses': responses,"response2":responses2})

#         # except Exception as e:
#         #     return JsonResponse({'error': str(e)}, status=500)




















