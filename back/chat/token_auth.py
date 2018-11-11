from django.contrib.auth.models import User
from django.http import JsonResponse
import jwt
import datetime
from dynaconf import settings
from channels.db import database_sync_to_async

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
            raise InvalidToken("Ther is no auth info in header")

        #example auth = "Bearer ASDFSAF.asfkasjlf.afkjasfd"
        auth = auth.split()

        if len(auth) == 1 or len(auth) > 2:
            raise InvalidToken("The header has invalid token type")

        token = auth[1]

        return self.getUserFrom(token)

    @classmethod
    def getUserFrom(self, token):
        if token=="null":
            raise InvalidToken("Null Token not allowed")

        try:
            payload = jwt.decode(token, settings.get("JWT_SECRET_KEY"), algorithms=['HS256'])
            username = payload['username']
            userid = payload['id']

        except jwt.DecodeError or jwt.InvalidTokenError:
            raise InvalidToken("Token Decode Error")

        try:
            user = User.objects.get(
                    id=userid,
                    username=username
                    )
        except User.DoesNotExist:
            raise InvalidToken("User is not found")

        return user

    @database_sync_to_async
    def asyncGetUserFrom(self, token):
        if token=="null":
            raise InvalidToken("Null Token not allowed")

        try:
            payload = jwt.decode(token, settings.get("JWT_SECRET_KEY"), algorithms=['HS256'])
            username = payload['username']
            userid = payload['id']

        except jwt.DecodeError or jwt.InvalidTokenError:
            raise InvalidToken("Token Decode Error")

        try:
            user = User.objects.get(
                    id=userid,
                    username=username
                    )
        except User.DoesNotExist:
            raise InvalidToken("User is not found")

        return user

class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class InvalidToken(Error):
    """
    Raise When Token is Invalid
    Example : No headers, Null Token, Token Decode Error, User is Not found

    """
    def __init__(self, message):
        self.message = message
