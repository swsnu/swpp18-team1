import { User } from "./user"

export class Channel {
  manager: User;
  id: number;
  channel_hash: string;
  title: string;
  post?: string;

  public constructor(obj: Partial<Channel> = {}) {
    Object.assign(this, obj);
  }

}
