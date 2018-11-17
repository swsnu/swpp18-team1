from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Channel, ChannelMessage
from django.test.client import RequestFactory
from .token_auth import TokenAuth, InvalidToken
from dynaconf import settings
from .serializers import UserSerializer, ChannelMessageSerializer
import jwt

import json

class ChatTestCase(TestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username="iu", password="12341234")
        self.channel1 = Channel.objects.create(title="music box", manager=self.user1)
        self.message1 = ChannelMessage.objects.create(sender=self.user1, channel=self.channel1, content="hi")
        self.auth_header = "Bearer " + TokenAuth.generateToken(self.user1)
        self.factory = RequestFactory()


    def test_channel_create(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/channel', json.dumps({'title': 'test1234'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 401) # unauthorized

        response = client.post('/api/channel', json.dumps({'title': 'test1234'}),
                content_type='application/json', HTTP_AUTHORIZATION=self.auth_header)

        self.assertEqual(response.status_code, 201) # created

        response = client.put('/api/channel', json.dumps({'title': 'test'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 405) # not allowed

        response = client.post('/api/channel', json.dumps({'title1': 'test', 'content2': 'test, test'}),
                content_type='application/json', HTTP_AUTHORIZATION=self.auth_header)

        self.assertEqual(response.status_code, 400) # Bad Request

    def test_channel_detail(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/channel/1')
        self.assertEqual(response.status_code, 200) # success
        channel = json.loads(response.content)
        self.assertEqual(self.channel1.id, channel["id"])
        self.assertEqual(self.channel1.manager_id, channel["manager_id"])
        self.assertEqual(self.channel1.title, channel["title"])

        response = client.get('/api/channel/100')
        self.assertEqual(response.status_code, 404) # not found

        response = client.put('/api/channel/1')
        self.assertEqual(response.status_code, 405) # not allowed

    def test_channel_message(self):

        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/channel/1/message')
        self.assertEqual(response.status_code, 401) # success

        response = client.get('/api/channel/1/message', HTTP_AUTHORIZATION=self.auth_header)

        self.assertEqual(response.status_code, 200) # success
        messages = json.loads(response.content)
        self.assertEqual(1, len(messages)) # not found
        self.assertEqual(self.message1.content, messages[0]["content"])
        self.assertEqual(self.message1.sender_id, messages[0]["sender"]["id"])
        self.assertEqual(self.message1.sender.username, messages[0]["sender"]["username"])

        response = client.get('/api/channel/100/message', HTTP_AUTHORIZATION=self.auth_header)
        self.assertEqual(response.status_code, 404) # not found
        response = client.put('/api/channel/1/message', HTTP_AUTHORIZATION=self.auth_header)

        self.assertEqual(response.status_code, 405) # not allowed

    def test_channel_user(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/channel/1/user', json.dumps({'username': 'test+user', 'image': 'https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=inside|900:auto&output-quality=90'}),
                 content_type='application/json')
        self.assertEqual(response.status_code, 201) # success
        data = json.loads(response.content)
        self.assertEqual(True, data["token"] is not None)
        self.assertEqual("https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=inside|900:auto&output-quality=90", data["image"])


        response = client.post('/api/channel/100/user', json.dumps({'username': 'test+user', 'image': 'https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=inside|900:auto&output-quality=90'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 404) # not found

        response = client.post('/api/channel/100/user', json.dumps({'username1': 'test+user', 'image1': 'https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=inside|900:auto&output-quality=90'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 400) # not found

        response = client.put('/api/channel/100/user', json.dumps({'username': 'test+user', 'image': 'https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=inside|900:auto&output-quality=90'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 405) # not allowed

    def test_manager_signup(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/manager/signup', json.dumps({'username': 'iuiuiu', "password": "iuiu"}),
                content_type='application/json')
        self.assertEqual(response.status_code, 201) # success

        response = client.post('/api/manager/signup', json.dumps({'username2': 'iu@iu.com', "password2": "iuiu"}),
                content_type='application/json')
        self.assertEqual(response.status_code, 400) # success

        response = client.put('/api/manager/signup', json.dumps({'username': 'iuuuuu', "password": "iuiu"}),
                content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_manager_signin(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/manager/signin', json.dumps({'title1': 'test', 'content2': 'test, test'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 400) # Bad Request

        response = client.put('/api/manager/signin', json.dumps({'title1': 'test', 'content2': 'test, test'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 405) # not allowed

        response = client.post('/api/manager/signin', json.dumps({'username': 'iu', 'password': '1234'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 401) # not allowed

        response = client.post('/api/manager/signin', json.dumps({'username': 'iu', 'password': '12341234'}),
                content_type='application/json')
        self.assertEqual(response.status_code, 200) # signin

    def test_token_auth(self):
        token = TokenAuth.generateToken(self.user1)
        self.assertEqual(token is not None, True)

        # case 1 No auth header
        request = self.factory.get('/api/channel/1')
        self.assertRaises(InvalidToken, lambda:TokenAuth.authenticate(request))

        # case 2 invalid header type
        request = self.factory.get('/api/channel/1', HTTP_AUTHORIZATION= token)
        self.assertRaises(InvalidToken, lambda:TokenAuth.authenticate(request))

        # case 3 invalid token
        request = self.factory.get('/api/channel/1', HTTP_AUTHORIZATION= "Bearer " + token + "1234")
        self.assertRaises(InvalidToken, lambda:TokenAuth.authenticate(request))

        # case 4 null token
        request = self.factory.get('/api/channel/1', HTTP_AUTHORIZATION= "Bearer " + "null")
        self.assertRaises(InvalidToken, lambda:TokenAuth.authenticate(request))

        # case 5 user not found
        payload = {'id': 100, 'username': "swpp_user"}
        no_user_token = jwt.encode(payload, settings.get("JWT_SECRET_KEY")).decode("utf-8")
        request = self.factory.get('/api/channel/1', HTTP_AUTHORIZATION= "Bearer " + no_user_token)
        self.assertRaises(InvalidToken, lambda:TokenAuth.authenticate(request))

        # case 6 valid auth
        request = self.factory.get('/api/channel/1', HTTP_AUTHORIZATION= "Bearer " + token)
        result = TokenAuth.authenticate(request)
        self.assertEqual(result, self.user1) # Get User!!

    def test_serializer(self):
        user_result = UserSerializer(instance=self.user1)
        self.assertEqual(self.user1.id, user_result.data["id"])
        self.assertEqual(self.user1.username, user_result.data["username"])

        channel_message_result = ChannelMessageSerializer(instance=self.message1)
        self.assertEqual(self.message1.content, channel_message_result.data["content"])
        self.assertEqual(self.message1.sender.id, channel_message_result.data["sender"]["id"])
        self.assertEqual(self.message1.sender.username, channel_message_result.data["sender"]["username"])




