from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, JsonResponse
from django.http import HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
from django.views.decorators.csrf import ensure_csrf_cookie, requires_csrf_token, csrf_exempt
from .models import Channel
import json

def managerToRoom(manager_id):
    # TODO: resolve it
    return 'room-' + str(manager_id)

@csrf_exempt
def channel(request):
    if request.method == 'POST':
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            manager_id = req_data['manager_id']
            room_name = managerToRoom(manager_id)
            Channel.objects.create(manager=manager_id, title=title)
            # return HttpResponse(status=201, mana)
            return JsonResponse({'room_name': room_name})
    if request.method == 'GET':
        print('get method arrived ')
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
