export class Channel {
  manager_id: number;
  id: number;
  title: string;
  post?: string;

  public constructor(obj: Partial<Channel> = {}) {
    Object.assign(this, obj);
  }
}
