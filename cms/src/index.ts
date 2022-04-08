import { AuthorSection } from './ui/author_section';
import { PostSection } from './ui/post_section';

const sections = [
  new AuthorSection(document.querySelector('#author')),
  new PostSection(document.querySelector('#post')),
];
sections.map(s => s.onInit());
