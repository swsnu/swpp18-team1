from channels.generic.websocket import AsyncWebsocketConsumer
import urllib.parse as urlparse
import json
from .token_auth import TokenAuth, InvalidToken
from channels.db import database_sync_to_async
from .models import Channel, ChannelMessage
from .enums import EventType
from .serializers import ChannelMessageSerializer

## TODO soket protocol class
class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.channel_hash = self.scope['url_route']['kwargs']['channel_hash']

        ## TODO check channel hash
        self.channel_id = self.channel_hash

        ## TODO set group name by channel id decoded from channel_hash
        token = self.scope['url_route']['kwargs']['token']

        try:
            self.user = await TokenAuth.asyncGetUserFrom(token)
        except InvalidToken as e:
            ## send fail message
            return self.close()

        self.room_group_name = 'channel_' + self.channel_hash

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Send intro message to group
        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'event_type': EventType.NewUserConnect,
                'data': {'content' : self.user.username + "님이 입장하셨습니다." }
            }
        )


    async def disconnect(self, close_code):
        # Join room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from Websocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        event_type = text_data_json['event_type']
        data = text_data_json['data']

        if event_type == EventType.SendChannelMessage:
            message = ChannelMessage.objects.create(sender= self.user, content=data['content'], channel_id=self.channel_id)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat.message",
                    'event_type': EventType.ReceiveChannelMessage,
                    'data': ChannelMessageSerializer(instance=message).data
                }
            )

        else:
            print("Not implmented Event")


    # Receive message from room group
    async def chat_message(self, event):
        event_type = event['event_type']
        data = event['data']

        # Send message to Websocket
        await self.send(text_data=json.dumps({
            'event_type': event_type,
            'data': data,
        }))
