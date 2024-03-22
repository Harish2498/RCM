# # recommender_app/serializers.py
# from rest_framework import serializers
# from .models import SampleData

# class SampleDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SampleData
#         fields = ['Rndrng_Prvdr_Last_Org_Name', 'Rndrng_Prvdr_City', 'HCPCS_Cd', 'HCPCS_Desc', 'Avg_Mdcr_Alowd_Amt', 'Avg_Mdcr_Pymt_Amt']



from rest_framework import serializers
from .models import MedicareData

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicareData
        fields = ('rndrng_prvdr_city',)  # Assuming you only want to serialize the city names
