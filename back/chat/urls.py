from django.urls import path
from . import views

urlpatterns = [
    path('user', views.manager_sign_up, name="manager_sign_up"),
    path('channel', views.channel, name="channel"),
    path('channel/<int:channel_id>', views.channel_detail, name="channel_detail"),
    path('channel/<int:channel_id>/user', views.user_sign_up, name="user_sign_up"),
    path('channel/<int:channel_id>/message', views.channel_message, name="channel_message"),
]


