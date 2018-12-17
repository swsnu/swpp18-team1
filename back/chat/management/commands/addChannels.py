from django.core.management import BaseCommand
from chat.models import Channel
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'creates given number of test channels'

    def add_arguments(self, parser):
        parser.add_argument('num_channels', type=int)

    def handle(self, *args, **options):
        manager_id = User.objects.first().id
        num_channels = options['num_channels']
        if num_channels > 0:
            Channel.objects.bulk_create(
                [Channel(manager_id=manager_id, title=f'Test Channel{i}', post=f'This is the test Channel {i}', channel_hash = get_random_string(length=5))
                 for i in range(num_channels)]
            )
        self.stdout.write(self.style.SUCCESS(f'Successfully added {num_channels} channels'))
