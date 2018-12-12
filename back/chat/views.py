from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from json.decoder import JSONDecodeError
from .models import Channel, ChannelMessage, UserProfile
from .token_auth import TokenAuth, InvalidToken
from .serializers import ChannelMessageSerializer, ChannelSerializer
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
            data = json.loads(body)
            title = data['title']
            post = data['post'] ## TODO Need Sanitizer because post is html text
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        channel = Channel(title=title, post=post, manager=user)
        channel.save()

        serializer = ChannelSerializer(channel)

        return JsonResponse(data=serializer.data, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def channel_detail(request, channel_hash):
    if request.method == 'GET':
        try:
            channel = Channel.objects.get(id=channel_hash)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        serializer = ChannelSerializer(channel)

        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        try:
            user = TokenAuth.authenticate(request)
        except InvalidToken as e:
            return JsonResponse({'message': e.message}, status=401)

        try:
            channel = Channel.objects.get(id=channel_hash)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        if user.id is not channel.manager.id:
            return JsonResponse({'message': "해당 채널의 관리자가 아닙니다."}, status=401)

        try:
            body = request.body.decode()
            data = json.loads(body)
            title = data['title']
            post = data['post']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        channel.title = title
        channel.post = post
        channel.save()

        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])

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

        if User.objects.filter(username=username).exists():
            return HttpResponse(status=409)

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

        # find uniq username
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
            serializer = ChannelSerializer(channel)
            return JsonResponse(serializer.data)
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
