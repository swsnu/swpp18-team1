export class Snippet {
  sender_id: number;
  username: string;
  content: string;

  public constructor(obj: Partial<Snippet> = {}) {
    Object.assign(this, obj);
  }

}
