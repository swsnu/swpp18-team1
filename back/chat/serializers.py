from rest_framework import serializers
from .models import ChannelMessage
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')

class ChannelMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(many=False, read_only=True)

    class Meta:
        model = ChannelMessage
        fields = ('content', 'sender')
