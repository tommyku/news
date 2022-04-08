import { AuthorMeta } from './author_meta';

export class Pl {
  authors: AuthorMeta[] = [];

  public toJSON(): string {
    return JSON.stringify({
      authors: this.authors.map(a => a.toObject()),
      posts: [],
      photos: []
    });
  }

  public static fromJSON(json: string): Pl {
    const obj: any = JSON.parse(json);
    return Pl.fromObject(obj);
  }

  public static fromObject(obj: any): Pl {
    const pl: Pl = new Pl();
    pl.authors = obj.authors.map((a: any) => AuthorMeta.fromObject(a));
    return pl;
  }
}

