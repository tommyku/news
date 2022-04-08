import { StorageService } from '../service/storage_service';
import { OnInit } from '../interface/on_init';
import { Post } from '../model/post';
import { PostMeta } from '../model/post_meta';

export class PostSection implements OnInit {
  private postMetas: PostMeta[] = [];
  private authorMetas: AuthorMeta[] = [];
  private elm: HTMLElement | null;

  constructor(elm: HTMLElement | null) {
    this.elm = elm;
  }

  public onInit(): void {
    this.loadAuthors()
      .then(() => this.loadPosts());
  }

  private addPost(post: Post): Promise<void> {
    return StorageService.addPost(post)
      .then(e => this.loadPosts());
  }

  private deletePost(postMeta: PostMeta): Promise<void> {
    // Remove posts
    return StorageService.deletePost(postMeta)
      .then(e => this.loadPosts());
  }

  private loadAuthors(): Promise<void> {
    return StorageService.loadAuthors()
      .then(authorMetas => this.authorMetas = authorMetas)
      .then(authorMetas => this.render());
  }

  private loadPosts(): Promise<void> {
    return StorageService.loadPosts()
      .then(postMetas => this.postMetas = postMetas)
      .then(postMetas => this.render());
  }

  private readPost(postMeta: PostMeta): Promise<void> {
    return StorageService.readPost(postMeta)
      .then(e => this.render());
  }

  private render(): void {
    if (this.elm === null) return;
    this.elm.innerHTML = `
      <h3>Posts</h3>
      <hr />
      <form>
        Author
        <br />
        <select name="post_author">
          ${this.authorMetas.map(a => `<option value="${a.id}">${a.name}</option>`)}
        </select>
        <br />
        Content
        <br />
        <textarea name="post_content"></textarea>
        <br />
        <p><input type="submit" value="submit" /></p>
      </form>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Read</th>
          <th>Delete</th>
        </tr>
        ${this.postMetas.reverse().map((a, i) => `
        <tr>
          <td>${i+1}</td>
          <td>${a.name}</td>
          <td><button class="post_read" data-id="${a.id}">Read</button></td>
          <td><button class="post_delete" data-id="${a.id}">Delete</button></td>
        </tr>
        `).join('')}
      </table>
      <dialog id="post_view">
        <div></div>
        <button class="post_view_close">Close</button>
      </dialog>
    `;
    const $form: HTMLFormElement | null = this.elm.querySelector('form');
    const $delete: NodeListOf<Element> | null = this.elm.querySelectorAll('button.post_delete');
    const $read: NodeListOf<Element> | null = this.elm.querySelectorAll('button.post_read');
    const $closePreview: HTMLElement | null = this.elm.querySelector('button.post_view_close');
    const $dialog: HTMLElement | null = this.elm.querySelector('dialog#post_view');

    if ($form !== null) {
      $form.addEventListener('submit', this.onSubmit.bind(this));
    }
    Array.from($delete).map(btn => btn.addEventListener('click', this.onDelete.bind(this)));
    Array.from($read).map(btn => btn.addEventListener('click', this.onRead.bind(this)));
    if ($closePreview && $dialog) {
      $closePreview.addEventListener('click', () => {
        $dialog.close();
      });
    }
  }

  private onSubmit(e: SubmitEvent): boolean {
    if (e && e.target) {
      // @ts-ignore
      const $content: HTMLInputElement | null = e.target.post_content;
      // @ts-ignore
      const $select: HTMLInputElement | null = e.target.post_author;
      StorageService.loadAuthors()
        .then(authorMetas => StorageService.readAuthor(authorMetas.find(a => a.id === $select.value)))
        .then(author => {
          this.addPost(new Post(new Date(), author, $content.value));
        });
      e.preventDefault();
    }
    return false;
  }

  private onDelete(e: Event): boolean {
    // @ts-ignore
    const $btn: HTMLElement | null = e.target;
    if (confirm("Delete?")) {
      const id = $btn.dataset.id;
      this.deletePost(this.postMetas.find(a => a.id === id));
    }
    return false;
  }

  private onRead(e: Event): boolean {
    // @ts-ignore
    const $btn: HTMLElement | null = e.target;
    const id = $btn.dataset.id;
    StorageService.readPost(this.postMetas.find(a => a.id === id))
      .then(post => {
        // @ts-ignore
        const $dialog: HTMLElement | null = this.elm.querySelector('dialog#post_view');
        console.log(post);
        $dialog.querySelector('div').innerHTML = post.toJSON();
        $dialog.showModal();
      });
    return false;
  }
}
