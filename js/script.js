const myLibrary = [];

function Book({ title, author, pages, isRead }) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  const newBook = new Book(book);
  myLibrary.push(newBook);
}
