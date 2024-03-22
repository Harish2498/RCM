# myapp/models.py
from django.db import models

class MedicareData(models.Model):
    serial_no = models.CharField(max_length=20)
    rndrng_npi = models.CharField(max_length=20)
    rndrng_prvdr_last_org_name = models.CharField(max_length=255)
    rndrng_prvdr_first_name = models.CharField(max_length=255)
    rndrng_prvdr_mi = models.CharField(max_length=10, blank=True, null=True)
    rndrng_prvdr_crdntls = models.CharField(max_length=50, blank=True, null=True)
    rndrng_prvdr_gndr = models.CharField(max_length=1, blank=True, null=True)
    rndrng_prvdr_ent_cd = models.CharField(max_length=10, blank=True, null=True)
    rndrng_prvdr_st1 = models.CharField(max_length=255, blank=True, null=True)
    rndrng_prvdr_st2 = models.CharField(max_length=255, blank=True, null=True)
    rndrng_prvdr_city = models.CharField(max_length=255, blank=True, null=True)
    rndrng_prvdr_state_abrvtn = models.CharField(max_length=2, blank=True, null=True)
    rndrng_prvdr_state_fips = models.CharField(max_length=2, blank=True, null=True)
    rndrng_prvdr_zip5 = models.CharField(max_length=5, blank=True, null=True)
    rndrng_prvdr_ruca = models.CharField(max_length=5, blank=True, null=True)
    rndrng_prvdr_ruca_desc = models.CharField(max_length=255, blank=True, null=True)
    rndrng_prvdr_cntry = models.CharField(max_length=50, blank=True, null=True)
    rndrng_prvdr_type = models.CharField(max_length=50, blank=True, null=True)
    rndrng_prvdr_mdcr_prtcptg_ind = models.CharField(max_length=1, blank=True, null=True)
    hcpcs_cd = models.CharField(max_length=10, blank=True, null=True)
    hcpcs_desc = models.TextField(blank=True, null=True)
    hcpcs_drug_ind = models.CharField(max_length=1, blank=True, null=True)
    place_of_srvc = models.CharField(max_length=255, blank=True, null=True)
    tot_benes = models.IntegerField(blank=True, null=True)
    tot_srvcs = models.FloatField(blank=True, null=True)
    tot_bene_day_srvcs = models.IntegerField(blank=True, null=True)
    avg_sbmtd_chrg = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    avg_mdcr_alowd_amt = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    avg_mdcr_pymt_amt = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    avg_mdcr_stdzd_amt = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = "tbl_medicare_data"





