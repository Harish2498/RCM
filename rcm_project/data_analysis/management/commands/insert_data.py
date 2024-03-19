# myapp/management/commands/insert_medicare_data.py
import os
import csv
from django.core.management.base import BaseCommand
from data_analysis.models import MedicareData

class Command(BaseCommand):
    help = 'Insert Medicare data from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_name =  os.path

        csv_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sampledata.csv")
        print(csv_file_path,"?>>>>>>>>>>>>>>")  # Get full path to CSV file
        
        # Check if the CSV file exists
        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f'CSV file "{csv_file_name}" not found in the app directory'))
            return

        records = []

        with open(csv_file_path, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                if MedicareData.objects.filter(serial_no = row[0]):
                    self.stdout.write(self.style.SUCCESS('Data already inserted'))

                record = MedicareData.objects.create(
                    serial_no=row[0],
                    rndrng_npi=row[1],
                    rndrng_prvdr_last_org_name=row[2],
                    rndrng_prvdr_ent_cd=row[3],
                    rndrng_prvdr_st1=row[4],
                    rndrng_prvdr_city=row[5],
                    rndrng_prvdr_cntry=row[6],
                    rndrng_prvdr_type=row[7],
                    hcpcs_cd=row[8],
                    hcpcs_desc=row[9],
                    hcpcs_drug_ind=row[10],
                    place_of_srvc=row[11],
                    tot_benes=row[12],
                    tot_srvcs=row[13],
                    tot_bene_day_srvcs=row[14],
                    avg_sbmtd_chrg=row[15],
                    avg_mdcr_alowd_amt=row[16],
                    avg_mdcr_pymt_amt=row[17],
                    avg_mdcr_stdzd_amt=row[18]
                )
                records.append(record)


            self.stdout.write(self.style.SUCCESS('Successfully inserted data from CSV file'))
