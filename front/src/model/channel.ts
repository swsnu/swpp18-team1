import { User } from "./user"

export class Channel {
  manager: User;
  id: number;
  title: string;
  post?: string;

  public constructor(obj: Partial<Channel> = {}) {
    Object.assign(this, obj);
  }

}
