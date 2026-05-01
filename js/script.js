const myLibrary = [];
const modal = document.querySelector("#modal");
const defaultBtn = document.querySelector(".default-add-button");
const deleteBtn = document.querySelector(".form-close-btn");
const cancelBtn = document.querySelector("#form-cancel-button");
const fab = document.querySelector("#fab");

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

fab.addEventListener("click", () => modal.showModal());
defaultBtn.addEventListener("click", () => modal.showModal());
deleteBtn.addEventListener("click", () => modal.close());
cancelBtn.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
modal.addEventListener("close", () => {
  modal.querySelector("form").reset();
});
