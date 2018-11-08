from django.contrib.auth.models import User
from django.http import JsonResponse
import jwt
import datetime
from dynaconf import settings

class TokenAuth:

    # TODO : add exp
    @classmethod
    def generateToken(self, user):
        payload = {'id': user.id, 'username': user.username}
        jwt_token = jwt.encode(payload, settings.get("JWT_SECRET_KEY")).decode("utf-8")
        return jwt_token


    @classmethod
    def authenticate(self, request):
        auth = str(request.META.get('HTTP_AUTHORIZATION'))

        if auth == "None":
            return JsonResponse({'Error': "There is no auth info in header"}, status="403")

        #example auth = "Bearer ASDFSAF.asfkasjlf.afkjasfd"
        auth = auth.split()

        if len(auth) == 1 or len(auth) > 2:
            return JsonResponse({'Error': "Token is invalid"}, status="403")

        token = auth[1]
        if token=="null":
            return JsonResponse({'Error': "Null token not allowed"}, status="403")

        try:
            payload = jwt.decode(token, settings.get("JWT_SECRET_KEY"), algorithms=['HS256'])
            username = payload['username']
            userid = payload['id']

        except jwt.DecodeError or jwt.InvalidTokenError:
            return JsonResponse({'Error': "Token is invalid"}, status="403")

        try:
            user = User.objects.get(
                    id=userid,
                    username=username
                    )
        except User.DoesNotExist:
            return JsonResponse({'Error': "User is not found"}, status="404")

        return user
