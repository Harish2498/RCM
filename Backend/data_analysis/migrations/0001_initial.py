# Generated by Django 5.0.3 on 2024-03-19 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MedicareData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_no', models.CharField(max_length=255)),
                ('rndrng_npi', models.CharField(max_length=255)),
                ('rndrng_prvdr_last_org_name', models.CharField(max_length=255)),
                ('rndrng_prvdr_ent_cd', models.CharField(max_length=255)),
                ('rndrng_prvdr_st1', models.CharField(max_length=255)),
                ('rndrng_prvdr_city', models.CharField(max_length=255)),
                ('rndrng_prvdr_cntry', models.CharField(max_length=255)),
                ('rndrng_prvdr_type', models.CharField(max_length=255)),
                ('hcpcs_cd', models.CharField(max_length=255)),
                ('hcpcs_desc', models.TextField()),
                ('hcpcs_drug_ind', models.CharField(max_length=255)),
                ('place_of_srvc', models.CharField(max_length=255)),
                ('tot_benes', models.CharField(max_length=255)),
                ('tot_srvcs', models.FloatField()),
                ('tot_bene_day_srvcs', models.FloatField()),
                ('avg_sbmtd_chrg', models.DecimalField(decimal_places=2, max_digits=15)),
                ('avg_mdcr_alowd_amt', models.DecimalField(decimal_places=2, max_digits=15)),
                ('avg_mdcr_pymt_amt', models.DecimalField(decimal_places=2, max_digits=15)),
                ('avg_mdcr_stdzd_amt', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
            options={
                'db_table': 'tbl_medicare_data',
                'managed': True,
            },
        ),
    ]