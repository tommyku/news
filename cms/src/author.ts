export class Author {
  type: string = 'h-card';
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  public toJSON(): string {
    return JSON.stringify({
      type: [ this.type ],
      properties: {
        name: [ this.name ],
        url: [ this.url ]
      }
    });
  }

  static public fromJSON(json: string): Author {
    const obj: any = JSON.parse(json);
    return new Author(obj.properties.name[0], obj.properties.url[0]);
  }
}
