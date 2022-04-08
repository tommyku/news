export class PostMeta {
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

  public static fromJSON(json: string): PostMeta {
    const obj: any = JSON.parse(json);
    return PostMeta.fromObject(obj);
  }

  public static fromObject(obj: any): PostMeta {
    return new PostMeta(obj.name, obj.id);
  }
}

