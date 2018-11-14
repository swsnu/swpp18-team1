from channels.generic.websocket import AsyncWebsocketConsumer
import urllib.parse as urlparse
import json
from .token_auth import TokenAuth, InvalidToken
from channels.db import database_sync_to_async

## TODO soket protocol class
class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.channel_hash= self.scope['url_route']['kwargs']['channel_hash']

        ## TODO check channel hash
        ## TODO set group name by channel id decoded from channel_hash
        token = self.scope['url_route']['kwargs']['token']

        try:
            self.user = await TokenAuth.asyncGetUserFrom(token)
        except InvalidToken as e:
            ## send fail message
            return self.close()

        print(self.user)
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
                'type': 'chat_message',
                'content': self.user.username + "님이 입장하셨습니다.",
                'id': "Notification",
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
        content = text_data_json['content']
        id = text_data_json['id']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'content': content,
                'id': id,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        content = event['content']
        id = event['id']

        # Send message to Websocket
        await self.send(text_data=json.dumps({
            'content': content,
            'id': id,
        }))
