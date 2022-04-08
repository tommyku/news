import { StorageService } from '../service/storage_service';
import { OnInit } from '../interface/on_init';
import { Author } from '../model/author';
import { AuthorMeta } from '../model/author_meta';

export class AuthorSection implements OnInit {
  private authorMetas: AuthorMeta[] = [];
  private elm: HTMLElement | null;

  constructor(elm: HTMLElement | null) {
    this.elm = elm;
  }

  public onInit(): void {
    this.loadAuthors();
  }

  private addAuthor(author: Author): Promise<void> {
    return StorageService.addAuthor(author)
      .then(e => this.loadAuthors());
  }

  private deleteAuthor(authorMeta: AuthorMeta): Promise<void> {
    // Remove authors
    return StorageService.deleteAuthor(authorMeta)
      .then(e => this.loadAuthors());
  }

  private loadAuthors(): Promise<void> {
    return StorageService.loadAuthors()
      .then(authorMetas => this.authorMetas = authorMetas)
      .then(authorMetas => this.render());
  }

  private readAuthor(authorMeta: AuthorMeta): Promise<void> {
    return StorageService.readAuthor(authorMeta)
      .then(e => this.render());
  }

  private render(): void {
    if (this.elm === null) return;
    this.elm.innerHTML = `
      <h3>Authors</h3>
      <hr />
      <form>
        Name
        <br />
        <input type="text" name="author_name" />
        <br />
        URL
        <br />
        <input type="text" name="author_url" />
        <br />
        <p><input type="submit" value="submit" /></p>
      </form>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Delete</th>
          <th>Read</th>
        </tr>
        ${this.authorMetas.map((a, i) => `
        <tr>
          <td>${i+1}</td>
          <td>${a.name}</td>
          <td><button class="author_delete" data-id="${a.id}">Delete</button></td>
          <td><button class="author_read" data-id="${a.id}">Read</button></td>
        </tr>
        `).join('')}
      </table>
    `;
    const $form: HTMLFormElement | null = this.elm.querySelector('form');
    const $delete: NodeListOf<Element> | null = this.elm.querySelectorAll('button.author_delete');
    const $read: NodeListOf<Element> | null = this.elm.querySelectorAll('button.author_read');

    if ($form !== null) {
      $form.addEventListener('submit', this.onSubmit.bind(this));
    }
    Array.from($delete).map(btn => btn.addEventListener('click', this.onDelete.bind(this)));
    Array.from($read).map(btn => btn.addEventListener('click', this.onRead.bind(this)));
  }

  private onSubmit(e: SubmitEvent): boolean {
    if (e && e.target) {
      // @ts-ignore
      const $name: HTMLInputElement | null = e.target.author_name;
      // @ts-ignore
      const $url: HTMLInputElement | null = e.target.author_url;
      this.addAuthor(new Author($name.value, $url.value));
      e.preventDefault();
    }
    return false;
  }

  private onDelete(e: Event): boolean {
    // @ts-ignore
    const $btn: HTMLElement | null = e.target;
    const id = $btn.dataset.id;
    this.deleteAuthor(this.authorMetas.find(a => a.id === id));
    return false;
  }

  private onRead(e: Event): boolean {
    return false;
  }
}
