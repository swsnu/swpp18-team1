import { User } from "./user"

export class ChannelMessage {
  sender: User;
  content: string;

  public constructor(obj: Partial<ChannelMessage> = {}) {
    Object.assign(this, obj);
  }

}
