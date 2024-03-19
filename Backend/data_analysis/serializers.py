from .models import *
from rest_framework import serializers

class MedicareDataSerializer(serializers.Serializer):
    class Meta:
        model = MedicareData
        fields = '__all__'