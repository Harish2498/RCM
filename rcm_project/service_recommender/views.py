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

    # Create a list of dictionaries to hold the queryset data without including the similarity score
    results_without_similarity = []
    for index, row in enumerate(df_new):
        result_dict = {
            'provider_last_org_name': row.rndrng_prvdr_last_org_name,
            'provider_city': row.rndrng_prvdr_city,
            'hcpcs_cd': row.hcpcs_cd,
            'hcpcs_desc': row.hcpcs_desc,
            'avg_mdcr_pymt_amt': row.avg_mdcr_pymt_amt,
            'avg_mdcr_stdzd_amt': row.avg_mdcr_stdzd_amt
        }
        results_without_similarity.append(result_dict)

    # Sort the list of dictionaries based on the similarity score in descending order
    sorted_results = sorted(results_without_similarity, key=lambda x: similarities[0][index], reverse=True)

    # Return only the top 10 results
    return sorted_results[:10]

class recommendation_api(APIView):
    def post(self, request, format=None):
        user_req = request.data.get('user_req', '').strip() 
        if not user_req:
            return Response({'error': 'enter the  user request'})

        results = requirement_based_recommender(MedicareData.objects.all(), user_req)
        if not results:
            return Response({'message': 'No results found based on the user requirements'})
        return Response(results)
  




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from data_analysis.models import MedicareData  # Importing the MedicareData model
import pandas as pd

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
