from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import json
from json.decoder import JSONDecodeError
from .models import Channel, ChannelMessage

@csrf_exempt
def channel(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            title = json.loads(body)['title']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # FIXME manager_id is always 1
        channel = Channel(title=title, manager_id=1)
        channel.save()
        return HttpResponse(status=201)  # created
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
