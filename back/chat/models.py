from django.db import models
from django.contrib.auth.models import User

class Channel(models.Model):
    title = models.TextField()
    manager = models.ForeignKey(User, on_delete=models.CASCADE)

class ChannelMessage(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

class DirectChannel(models.Model):
    sender = models.ForeignKey(User, related_name = "send_direct_channels", null=True, on_delete=models.SET_NULL)
    receiver = models.ForeignKey(User, related_name = "receive_direct_channels", null=True, on_delete=models.SET_NULL)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

class DirectMessage(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    direct_channel = models.ForeignKey(DirectChannel, on_delete=models.CASCADE)

class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, null=True, on_delete=models.CASCADE)
    image = models.TextField()

