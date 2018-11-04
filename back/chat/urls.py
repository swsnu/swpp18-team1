from django.urls import path
from . import views

urlpatterns = [
    path('channel', views.channel, name="channel"),
    path('channel/<int:channel_id>', views.channel_detail, name="channel_detail"),
    path('channel/<int:channel_id>/message', views.channel_message, name="channel_message"),
]


