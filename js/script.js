const myLibrary = [];

function Book(options) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }

  this.options.id = options.id;
  this.options.title = options.title;
  this.options.author = options.author;
  this.options.pages = options.pages;
  this.options.isRead = options.isRead;
}
