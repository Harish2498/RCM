# Generated by Django 5.0.3 on 2024-03-22 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_analysis', '0010_rename_serial_no_medicaredata_rndrng_prvdr_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicaredata',
            name='serial_no',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
    ]
