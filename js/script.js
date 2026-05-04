const myLibrary = [];
const modal = document.querySelector("#modal");
const defaultBtn = document.querySelector("#open-form-button");
const closeBtn = document.querySelector("#close-btn");
const cancelBtn = document.querySelector("#form-cancel-button");
const fab = document.querySelector("#fab-btn");

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

Book.prototype.toggleIsRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  const newBook = new Book(book);
  myLibrary.push(newBook);
}

function getFormData(form) {
  const formDate = new FormData(form);
  const userObject = Object.fromEntries(formDate.entries());
  const normalizedUser = {
    ...userObject,
    isRead: userObject.isRead === "on",
  };
  return normalizedUser;
}

function updateStatusDisplay(clone, isRead) {
  const element = clone.querySelector("#status-badge");

  if (isRead) {
    element.textContent = "complete";
    element.classList.add("book-complete");
  } else {
    element.textContent = "unread";
    element.classList.add("book-unread");
  }
}

function closeModal() {
  modal.close();
}

function openModal() {
  modal.showModal();
}

function resetForm() {
  modal.querySelector("form").reset();
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "DIALOG") closeModal();

  const el = e.target.closest("[data-action]");
  if (!el) return;

  const action = el.dataset.action;
  if (action === "open-modal") openModal();
  if (action === "close-form") closeModal();
});

document.addEventListener(
  "close",
  (e) => {
    if (e.target.tagName === "DIALOG") resetForm();
  },
  true,
);

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookObj = getFormData(e.target);
  addBookToLibrary(bookObj);
  resetForm();
  closeModal();
  console.log(myLibrary);
});
