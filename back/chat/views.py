from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from json.decoder import JSONDecodeError
from .models import Channel, ChannelMessage, UserProfile


@csrf_exempt
def channel(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            title = json.loads(body)['title']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # FIXME manager_id is always 1
        channel = Channel(title=title, manager= User.objects.first())
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
def channel_detail(request, channel_id):
    if request.method == 'GET':
        try:
            channel = Channel.objects.get(id=channel_id)
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
def channel_message(request, channel_id):
    if request.method == 'GET':
        try:
            channel = Channel.objects.get(id=channel_id)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        messages = [message for message in ChannelMessage.objects.all().values()]
        return JsonResponse(messages, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def manager_sign_up(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            email = json.loads(body)['email']
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        user = User.objects.create_user(email=email, username=email, password=password)
        user.save()

        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def user_sign_up(request, channel_id):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            username = json.loads(body)['username']
            image = json.loads(body)['image']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        try:
            channel = Channel.objects.get(id=channel_id)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()

        user = User.objects.create_user(username=username)
        user.save()

        userProfile = UserProfile.objects.create(user=user, channel=channel, image=image)

        response_dict = {
                'id': user.id,
                'username': user.username,
                'image': userProfile.image,
                }
        return JsonResponse(data=response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def user_channel(request, user_id):
    if request.method == 'GET':
        try:
            channel = list(Channel.objects.all().filter(manager = user_id))
            if not channel: #user dont have channel
                return JsonResponse([], safe=False)
            response_dict = {
                'id': channel[0].id,
                'title': channel[0].title,
                'manager_id': channel[0].manager.id,
            }
            return JsonResponse(response_dict)
        except Channel.DoesNotExist:
            return HttpResponseNotFound()
