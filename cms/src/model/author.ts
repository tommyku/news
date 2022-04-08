export class Author {
  type: string = 'h-card';
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  public toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  public toObject(): any {
    return {
      type: [ this.type ],
      properties: {
        name: [ this.name ],
        url: [ this.url ]
      }
    };
  }

  public static fromJSON(json: string): Author {
    const obj: any = JSON.parse(json);
    return Author.fromObject(obj);
  }

  public static fromObject(obj: any): Author {
    return new Author(obj.properties.name[0], obj.properties.url[0]);
  }
}
