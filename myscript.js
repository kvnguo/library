class Book {
    constructor(title, author, rating, read) {
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.read = read;
    }

    // Toggle the read status 
    toggleReadStatus() {
        this.read = this.read === "Read" ? "Not Read" : "Read";
    }
}

class Library {
//Public: 
    constructor() {
        this.#addEvents();
    }

//Private:
    // Variables and cache DOM
    #books = [];
    #bookContainer = document.querySelector(".book-container");
    #form = document.querySelector("form");
    #dialog = document.querySelector("dialog");
    #showButton = document.querySelector("i");
    #confirmBtn = document.querySelector("#confirmBtn");
    #author = document.querySelector("#author");
    #title = document.querySelector("#title");
    #rating = document.querySelector("#rating");
    #read = document.querySelector("#have-read");

    #addEvents() {
        this.#showButton.addEventListener("click", () => this.#dialog.showModal());
        this.#confirmBtn.addEventListener("click", () => this.#handleConfirmation());
    }

    // Form confirmation and add a new book to the collection
    #handleConfirmation() {
        const titleValue = this.#title.value.trim();
        const authorValue = this.#author.value.trim() || "No Author";
        const ratingValue = this.#rating.value.trim() || "0";
        const haveRead = this.#read.checked ? "Read" : "Not Read";

        // Check if the form is valid 
        if (this.#form.checkValidity()) {
            const newBook = new Book(titleValue, authorValue, ratingValue, haveRead);
            this.#addBook(newBook);
        }
    }

    #addBook(book) {
        this.#books.push(book);
        this.#createBookUI(book);
    }

    // Create UI representation of a book
    #createBookUI(book) {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";

        // Create and append UI elements for title, author, and rating
        ["Title", "Author", "Rating"].forEach((prop) => {
            const propDiv = document.createElement("div");
            propDiv.className = `book${prop}`;
            // Display title in quotes, others as-is
            propDiv.textContent = prop === "Title" ? `"${book[prop.toLowerCase()]}"` : book[prop.toLowerCase()];
            bookDiv.appendChild(propDiv);
        });

        // Create UI element for "Read" button
        const bookRead = document.createElement("button");
        bookRead.className = "bookRead";
        bookRead.textContent = book.read;
        bookRead.addEventListener("click", () => this.#changeBookRead(book, bookRead));

        // Create UI element for "Delete" button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "bookDelete";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => this.#deleteBook(book, bookDiv));

        // Append "Read" and "Delete" buttons 
        [bookRead, deleteBtn].forEach((element) => bookDiv.appendChild(element));

        // Append the book's UI representation to the book container
        this.#bookContainer.appendChild(bookDiv);
    }

    // Toggle read status of a book and update UI
    #changeBookRead(book, bookRead) {
        book.toggleReadStatus();
        bookRead.textContent = book.read;
    }

    // Delete book from the collection and update the UI
    #deleteBook(book, bookDiv) {
        const index = this.#books.indexOf(book);
        if (index > -1) {
            this.#books.splice(index, 1);
            this.#bookContainer.removeChild(bookDiv);
        }
    }
}

const library = new Library();
