# myapp/management/commands/insert_medicare_data.py
import os
import csv
import time
from django.core.management.base import BaseCommand
from data_analysis.models import MedicareData

class Command(BaseCommand):
    help = 'Insert Medicare data from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_name =  os.path
        csv_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sample_data.csv")

        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f'CSV file "{csv_file_name}" not found in the app directory'))
            return
  
        records = []
        with open(csv_file_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:

                if  MedicareData.objects.filter(serial_no = row[0]):
                    self.stdout.write(self.style.SUCCESS('Data inserted successfully'))

                record = MedicareData.objects.create(
                    serial_no = row[0],
                    rndrng_npi=row[1],
                    rndrng_prvdr_last_org_name=row[2],
                    rndrng_prvdr_first_name=row[3],
                    rndrng_prvdr_mi=row[4],
                    rndrng_prvdr_crdntls=row[5],
                    rndrng_prvdr_gndr=row[6],
                    rndrng_prvdr_ent_cd=row[7],
                    rndrng_prvdr_st1=row[8],
                    rndrng_prvdr_st2=row[9],
                    rndrng_prvdr_city=row[10],
                    rndrng_prvdr_state_abrvtn=row[11],
                    rndrng_prvdr_state_fips=row[12],
                    rndrng_prvdr_zip5=row[13],
                    rndrng_prvdr_ruca=row[14],
                    rndrng_prvdr_ruca_desc=row[15],
                    rndrng_prvdr_cntry=row[16],
                    rndrng_prvdr_type=row[17],
                    rndrng_prvdr_mdcr_prtcptg_ind=row[18],
                    hcpcs_cd=row[19],
                    hcpcs_desc=row[20],
                    hcpcs_drug_ind=row[21],
                    place_of_srvc=row[22],
                    tot_benes=row[23],
                    tot_srvcs=row[24],
                    tot_bene_day_srvcs=row[25],
                    avg_sbmtd_chrg=row[26],
                    avg_mdcr_alowd_amt=row[27],
                    avg_mdcr_pymt_amt=row[28],
                    avg_mdcr_stdzd_amt=row[29]
                )
                records.append(record)
                self.stdout.write(self.style.SUCCESS('Data inserting...'))

            self.stdout.write(self.style.SUCCESS('Successfully inserted data from CSV file'))
