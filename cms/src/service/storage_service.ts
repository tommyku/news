import { Author } from '../model/author';
import { AuthorMeta } from '../model/author_meta';
import { Post } from '../model/post';
import { PostMeta } from '../model/post_meta';
import { Pl } from '../model/pl';

class _StorageService {
  private loadPl(): Promise<Pl> {
    return fetch(`http://localhost:8010/proxy/pl.json`)
      .then(res => res.json())
      .then(pl => Pl.fromObject(pl));
  }

  private savePl(pl: Pl): Promise<Pl> {
    return fetch(`http://localhost:8010/proxy/pl.json`, {
      method: 'PUT',
      body: pl.toJSON()
    })
      .then(res => pl);
  }

  public readPost(postMeta: PostMeta): Promise<Post> {
    return fetch(`http://localhost:8010/proxy/post/${postMeta.id}.json`)
      .then(res => res.json())
      .then(json => Post.fromObject(json));
  }

  public loadPosts(): Promise<PostMeta[]> {
    return this.loadPl()
      .then(pl => Pl.fromObject(pl).posts);
  }

  public addPost(post: Post): Promise<Post> {
    const id: string = (new Date()).getTime().toString();
    const postMeta = new PostMeta(post.content.substr(0, 48), id);
    return this.loadPl()
      .then(pl => { 
        pl.posts.push(postMeta);
        return pl;
      })
      .then(pl => this.savePl(pl))
      .then(res => fetch(`http://localhost:8010/proxy/post/${id}.json`, {
        method: 'PUT',
        body: post.toJSON()
      }))
      .then(res => post);
  }

  public deletePost(postMeta: PostMeta): Promise<PostMeta> {
    const id: string = postMeta.id;
    return this.loadPl()
      .then(pl => {
        pl.posts = pl.posts.filter(a => a.id !== postMeta.id);
        return pl;
      })
      .then(pl => this.savePl(pl))
      .then(res => fetch(`http://localhost:8010/proxy/post/${postMeta.id}.json`, {
        method: 'DELETE'
      }))
      .then(res => postMeta);
  }


  public readAuthor(authorMeta: AuthorMeta): Promise<Author> {
    return fetch(`http://localhost:8010/proxy/author/${authorMeta.id}.json`)
      .then(res => res.json())
      .then(json => Author.fromObject(json));
  }

  public loadAuthors(): Promise<AuthorMeta[]> {
    return this.loadPl()
      .then(pl => Pl.fromObject(pl).authors);
  }

  public addAuthor(author: Author): Promise<Author> {
    const id: string = (new Date()).getTime().toString();
    const authorMeta = new AuthorMeta(author.name, id);
    return this.loadPl()
      .then(pl => { 
        pl.authors.push(authorMeta);
        return pl;
      })
      .then(pl => this.savePl(pl))
      .then(res => fetch(`http://localhost:8010/proxy/author/${id}.json`, {
        method: 'PUT',
        body: author.toJSON()
      }))
      .then(res => author);
  }

  public addImage(filename: string): Promise<string> {
    return this.loadPl()
      .then(pl => { 
        pl.photos.push(filename);
        return pl;
      })
      .then(pl => this.savePl(pl))
      .then(res => filename);
  }


  public deleteAuthor(authorMeta: AuthorMeta): Promise<AuthorMeta> {
    const id: string = authorMeta.id;
    return this.loadPl()
      .then(pl => {
        pl.authors = pl.authors.filter(a => a.id !== authorMeta.id);
        return pl;
      })
      .then(pl => this.savePl(pl))
      .then(res => fetch(`http://localhost:8010/proxy/author/${authorMeta.id}.json`, {
        method: 'DELETE'
      }))
      .then(res => authorMeta);
  }
}

export const StorageService = new _StorageService();
