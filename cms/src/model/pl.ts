import { AuthorMeta } from './author_meta';
import { PostMeta } from './post_meta';

export class Pl {
  authors: AuthorMeta[] = [];

  public toJSON(): string {
    return JSON.stringify({
      authors: this.authors.map(a => a.toObject()),
      posts: this.posts.map(p => p.toObject()),
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
    pl.posts = obj.posts.map((p: any) => PostMeta.fromObject(p));
    return pl;
  }
}

