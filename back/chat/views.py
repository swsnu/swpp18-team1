from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from json.decoder import JSONDecodeError
from .models import Channel, ChannelMessage, UserProfile
from .token_auth import TokenAuth, InvalidToken
from .serializers import ChannelMessageSerializer
import random


@csrf_exempt
def channel(request):
    if request.method == 'POST':
        try:
            user = TokenAuth.authenticate(request)
        except InvalidToken as e:
            return JsonResponse({'message': e.message}, status=401)

        try:

            body = request.body.decode()
            title = json.loads(body)['title']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # FIXME manager_id is always 1
        channel = Channel(title=title, manager=user)

        channel.save()

        response_dict = {
                'id': channel.id,
                'title': channel.title,
                'manager_id': channel.manager.id,
        }
        return JsonResponse(data=response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def channel_detail(request, channel_hash):
    if request.method == 'GET':
        try:
            channel = Channel.objects.get(id=channel_hash)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        response_dict = {
                'id': channel.id,
                'title': channel.title,
                'manager_id': channel.manager.id,
        }
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def channel_message(request, channel_hash):
    if request.method == 'GET':
        try:
            TokenAuth.authenticate(request)
        except InvalidToken as e:
            return JsonResponse({'message': e.message}, status=401)

        try:
            channel = Channel.objects.get(id=channel_hash)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        messages = ChannelMessage.objects.filter(channel=channel)
        serializer = ChannelMessageSerializer(messages, many=True)

        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def manager_sign_up(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        user = User.objects.create_user(username=username, password=password)
        user.save()

        jwt_token = {'token': TokenAuth.generateToken(user)}

        return JsonResponse(jwt_token, status=201)

    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def user_access(request, channel_hash):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            username = json.loads(body)['username']
            image = json.loads(body)['image']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        try:
            channel = Channel.objects.get(id=channel_hash)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        ## find uniq username
        uniq_key = ''.join(random.choice('0123456789ABCDEF') for i in range(4))
        while User.objects.filter(username=username + "#" + uniq_key).exists():
            uniq_key = ''.join(random.choice('0123456789ABCDEF') for i in range(4))

        user = User.objects.create_user(username=username + "#" + uniq_key)

        userProfile = UserProfile.objects.create(user=user, channel=channel, image=image)

        return JsonResponse({'token': TokenAuth.generateToken(user)}, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def manager_channel(request):
    if request.method == 'GET':
        try:
            user = TokenAuth.authenticate(request)
        except InvalidToken as e:
            return JsonResponse({'message': e.message}, status=401)
        try:
            channel = Channel.objects.get(manager_id=user)
            response_dict = {
                'id': channel.id,
                'title': channel.title,
                'manager_id': channel.manager.id,
            }
            return JsonResponse(response_dict)
        except Channel.DoesNotExist:
            return JsonResponse({})

@csrf_exempt
def manager_sign_in(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        user = authenticate(username=username, password=password)

        if user is not None:
            jwt_token = {'token': TokenAuth.generateToken(user)}

            return JsonResponse(jwt_token, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

