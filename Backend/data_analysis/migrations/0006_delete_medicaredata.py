# Generated by Django 5.0.3 on 2024-03-18 11:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_analysis', '0005_alter_medicaredata_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MedicareData',
        ),
    ]