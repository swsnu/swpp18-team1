from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Channel

import json

class ChatTestCase(TestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username="iu", password="12341234")
        self.channel1 = Channel.objects.create(title="music box", manager=self.user1)

    def test_channel_create(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/channel', json.dumps({'title': 'test1234'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201) # created

        response = client.put('/api/channel', json.dumps({'title': 'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405) # not allowed

        response = client.post('/api/channel', json.dumps({'title1': 'test', 'content2': 'test, test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400) # Bad Request

    def test_channel_detail(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/channel/1')
        self.assertEqual(response.status_code, 200) # created
        channel = json.loads(response.content)
        self.assertEqual(self.channel1.id, channel["id"])
        self.assertEqual(self.channel1.manager_id, channel["manager_id"])
        self.assertEqual(self.channel1.title, channel["title"])

        response = client.get('/api/channel/100')
        self.assertEqual(response.status_code, 404) # not found

        response = client.put('/api/channel/1')
        self.assertEqual(response.status_code, 405) # not allowed
