import { Author } from './model/author';
import { AuthorSection } from './ui/author_section';

const sections = [
  new AuthorSection(document.querySelector('#author')),
];
sections.map(s => s.onInit());
