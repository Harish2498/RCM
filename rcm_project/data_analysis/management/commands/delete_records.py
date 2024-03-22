import time
from django.core.management.base import BaseCommand
from data_analysis.models import MedicareData

class Command(BaseCommand):
    help = 'Insert Medicare data from a CSV file'

    def handle(self, *args, **kwargs):
        record = MedicareData.objects.all().delete()
                

        self.stdout.write(self.style.SUCCESS('All records deleted successfully'))
