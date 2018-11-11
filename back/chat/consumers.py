from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.channel_hash= self.scope['url_route']['kwargs']['channel_hash']
        ## TODO check auth token
        ## TODO set group name by channel id decoded from channel_hash
        self.room_group_name = 'channel_' + self.channel_hash

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

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
