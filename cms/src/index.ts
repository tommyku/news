import { Author } from './author';

const author: Author = new Author("123", "456");

console.log(Author.fromJSON('{"type":["h-card"],"properties":{"name":["123"],"url":["456"]}}'));
console.log(author.toJSON());
