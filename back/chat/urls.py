from django.urls import path
from . import views

urlpatterns = [
    path('manager/signup', views.manager_sign_up, name="manager_sign_up"),
    path('manager/signin', views.manager_sign_in, name="manager_sign_in"),
    path('manager/<int:manager_id>/channel', views.manager_channel, name="manager_channel"),
    path('channel', views.channel, name="channel"),
    path('channel/<int:channel_id>', views.channel_detail, name="channel_detail"),
    path('channel/<int:channel_id>/user', views.user_sign_up, name="user_sign_up"),
    path('channel/<int:channel_id>/message', views.channel_message, name="channel_message"),
    path('user/<int:user_id>/channel', views.user_channel, name='user')
]
