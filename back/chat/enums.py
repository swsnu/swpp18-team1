from enum import IntEnum

class EventType(IntEnum):
    SendChannelMessage = 0
    ReceiveChannelMessage = 1
    NewUserConnect = 2

