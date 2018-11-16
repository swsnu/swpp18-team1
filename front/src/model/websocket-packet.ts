import { EventType } from 'src/enums';

export class WebsocketPacket {
  event_type?: EventType;
  data?: object;
  status_code?: number;

  public constructor(obj: Partial<WebsocketPacket> = {}) {
    Object.assign(this, obj);
  }

  public toJson(){
    return JSON.stringify({
      event_type: this.event_type,
      data: this.data,
      status_code: this.status_code,
    })
  }

}
