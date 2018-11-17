from django.urls import path
from . import views

urlpatterns = [
    path('manager/signup', views.manager_sign_up, name="manager_sign_up"),
    path('manager/signin', views.manager_sign_in, name="manager_sign_in"),
    path('manager/channel', views.manager_channel, name='manager_channel'),

    path('channel', views.channel, name="channel"),
    path('channel/<int:channel_id>', views.channel_detail, name="channel_detail"),
    path('channel/<int:channel_id>/user', views.user_access, name="user_access"),
    path('channel/<int:channel_id>/message', views.channel_message, name="channel_message"),

]
