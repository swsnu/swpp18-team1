export class User {
  id?: number;
  username?: string;

  // for manager
  password?: string;
  key?: string;

  // for user
  image?: string;

  public constructor(obj: Partial<User> = {}) {
    Object.assign(this, obj);
  }

}
