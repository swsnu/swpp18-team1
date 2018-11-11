from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:channel_hash>/token/<str:token>', consumers.ChatConsumer, name="socket_connect"),
]
