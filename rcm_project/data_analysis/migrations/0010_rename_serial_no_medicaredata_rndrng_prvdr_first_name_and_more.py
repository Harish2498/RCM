# Generated by Django 5.0.3 on 2024-03-22 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_analysis', '0009_alter_medicaredata_tot_benes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicaredata',
            old_name='serial_no',
            new_name='rndrng_prvdr_first_name',
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_crdntls',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_gndr',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_mdcr_prtcptg_ind',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_mi',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_ruca',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_ruca_desc',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_st2',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_state_abrvtn',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_state_fips',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='medicaredata',
            name='rndrng_prvdr_zip5',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='avg_mdcr_alowd_amt',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='avg_mdcr_pymt_amt',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='avg_mdcr_stdzd_amt',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='avg_sbmtd_chrg',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='hcpcs_cd',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='hcpcs_desc',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='hcpcs_drug_ind',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='place_of_srvc',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_npi',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_prvdr_city',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_prvdr_cntry',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_prvdr_ent_cd',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_prvdr_st1',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='rndrng_prvdr_type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='tot_bene_day_srvcs',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='tot_benes',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='medicaredata',
            name='tot_srvcs',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
