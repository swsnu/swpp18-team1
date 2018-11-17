import { User } from "./user"
import moment from "moment"

export class ChannelMessage {
  sender: User;
  content: string;
  created_at: Date;

  public constructor(obj: Partial<ChannelMessage> = {}) {
    Object.assign(this, obj);
  }

  public getCreatedAt(): string {
    return moment(this.created_at).locale("ko").fromNow()
  }

}
