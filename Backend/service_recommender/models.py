from django.db import models

class MedicareData(models.Model):
    rndrng_prvdr_city = models.CharField(max_length=255)
