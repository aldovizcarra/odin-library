const myLibrary = [];

function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
