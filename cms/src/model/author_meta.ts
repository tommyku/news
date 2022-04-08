export class AuthorMeta {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  toObject(): any {
    return {
      name: this.name,
      id: this.id
    }
  }

  public static fromJSON(json: string): AuthorMeta {
    const obj: any = JSON.parse(json);
    return AuthorMeta.fromObject(obj);
  }

  public static fromObject(obj: any): AuthorMeta {
    return new AuthorMeta(obj.name, obj.id);
  }
}
