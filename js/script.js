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

function getIcon(isRead) {
  const checkIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  checkIcon.setAttribute("viewBox", "0 -960 960 960");
  checkIcon.setAttribute("class", "check-icon");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "m424-325.85 268.92-268.92-42.15-42.15L424-410.15l-114-114L267.85-482 424-325.85ZM212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-760v560-560Z",
  );

  checkIcon.appendChild(path);

  const circleXmarkIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  circleXmarkIcon.setAttribute("viewBox", "0 -960 960 960");
  circleXmarkIcon.setAttribute("class", "xmark-icon");

  const xMarkPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  xMarkPath.setAttribute(
    "d",
    "m336-293.85 144-144 144 144L666.15-336l-144-144 144-144L624-666.15l-144 144-144-144L293.85-624l144 144-144 144L336-293.85ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
  );

  circleXmarkIcon.appendChild(xMarkPath);

  return isRead ? circleXmarkIcon : checkIcon;
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
