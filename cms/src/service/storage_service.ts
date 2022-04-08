import { Author } from '../model/author';
import { Pl } from '../model/pl';
import { AuthorMeta } from '../model/author_meta';

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
