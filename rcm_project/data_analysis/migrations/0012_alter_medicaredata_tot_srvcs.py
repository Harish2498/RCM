# Generated by Django 5.0.3 on 2024-03-22 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_analysis', '0011_medicaredata_serial_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicaredata',
            name='tot_srvcs',
            field=models.FloatField(blank=True, null=True),
        ),
    ]