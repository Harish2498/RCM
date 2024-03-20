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
    stop_words = set(["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
                      "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
                      "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
                      "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
                      "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
                      "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
                      "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
                      "at", "by", "for", "with", "about", "against", "between", "into", "through",
                      "during", "before", "after", "above", "below", "to", "from", "up", "down",
                      "in", "out", "on", "off", "over", "under", "again", "further", "then", "once"])

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
    print(similarities[0],">>>>>>>>")

    # Create a list of dictionaries to hold the queryset data alongside the calculated similarities
    results_with_similarity = []
    for index, row in enumerate(df_new):
        result_dict = {
            'provider_last_org_name': row.rndrng_prvdr_last_org_name,
            'provider_city': row.rndrng_prvdr_city,
            'hcpcs_cd': row.hcpcs_cd,
            'hcpcs_desc': row.hcpcs_desc,
            'avg_mdcr_alowd_amt': row.avg_mdcr_alowd_amt,
            'avg_mdcr_pymt_amt': row.avg_mdcr_pymt_amt,
            'similarity': similarities[0][index]  # Assign the similarity score to each row
        }
        results_with_similarity.append(result_dict)

    # Sort the list of dictionaries based on the similarity score in descending order
    sorted_results = sorted(results_with_similarity, key=lambda x: x['similarity'], reverse=True)

    # Return only the top 10 results
    return sorted_results[:10]
class recommendation_api(APIView):
    def post(self, request, format=None):
        user_req = request.data.get('user_req', '')
        result1 = requirement_based_recommender(MedicareData.objects.all(), user_req)
        return Response(result1)