import pandas as pd
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def services_api(request):
    medical_data = MedicareData.objects.filter(rndrng_prvdr_ent_cd = "O")
    data = {
        "total_services_with_drug": medical_data.filter(hcpcs_drug_ind = "Y").count(),
        "total_unique_cities":  medical_data.values("rndrng_prvdr_city").distinct().count(),
        "total_unique_services": medical_data.values("hcpcs_cd").distinct().count(),
        "total_unique_providers":  medical_data.values("rndrng_prvdr_last_org_name").distinct().count()
    }

    return Response({"data":data,"status":status.HTTP_200_OK})  
