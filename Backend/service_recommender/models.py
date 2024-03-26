# data_analysis/models.py

from django.db import models

class TopEarner(models.Model):
    provider_name = models.CharField(max_length=255)
    hcpcs_desc = models.JSONField()
    city = models.CharField(max_length=255)
    total_revenue = models.IntegerField()

    def __str__(self):
        return self.provider_name

class BottomEarner(models.Model):
    provider_name = models.CharField(max_length=255)
    hcpcs_desc = models.JSONField()
    city = models.CharField(max_length=255)
    total_revenue = models.IntegerField()

    def __str__(self):
        return self.provider_name