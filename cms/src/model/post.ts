import { Author } from './author';

export class Post {
  type: string = 'h-card';
  published: Date;
  author: Author;
  content: string;

  constructor(published: Date, author: Author, content: string) {
    this.published = published;
    this.author = author;
    this.content = content;
  }

  public toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  public toObject(): any {
    return {
      type: [ this.type ],
      properties: {
        url: null,
        published: [
          this.published.toISOString()
        ],
        author: [ this.author.toObject() ],
        content: [ this.content ]
      }
    };
  }

  public static fromJSON(json: string): Post {
    const obj: any = JSON.parse(json);
    return Post.fromObject(obj);
  }

  public static fromObject(obj: any): Post {
    return new Post(
      new Date(obj.properties.published),
      Author.fromObject(obj.properties.author[0]),
      obj.properties.content[0]
    );
  }
}
