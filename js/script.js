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

function addBookToLibrary(book) {
  const newBook = new Book(book);
  myLibrary.push(newBook);
}

function getFormData() {
  const formDate = new FormData(e.target);
  const userObject = Object.fromEntries(formDate.entries());
  const normalizedUser = {
    ...userObject,
    isRead: userObject.isRead === "on",
  };
  console.log(normalizedUser);
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

// fab.addEventListener("click", () => modal.showModal());
// defaultBtn.addEventListener("click", () => modal.showModal());
// closeBtn.addEventListener("click", () => modal.close());
// cancelBtn.addEventListener("click", () => modal.close());
// modal.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.close();
//   }
// });
// modal.addEventListener("close", () => {
//   modal.querySelector("form").reset();
// });
