const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || []; // Load from localStorage or start with an empty array

function saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    saveToLocalStorage(); // Update localStorage
    render();
}

function Book(title, author, pages, status, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.cover = cover;
}

Book.prototype.ReadOrnot = function() {
    this.status = !this.status;
};

function ReadOrnot(index) {
    myLibrary[index].ReadOrnot();
    saveToLocalStorage(); // Update localStorage
    render();
}

function render() {
    let newLibrary = document.querySelector("#library");
    newLibrary.innerHTML = ""; // Clear the content

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        let eBook = document.createElement("div");

        eBook.innerHTML = `
            <div class="card">
                <img src="${book.cover}" alt="Book Cover" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 10px;">
                <h3>Title : <p>&nbsp;${book.title}</p> </h3>
                <h3>Author : <p>&nbsp;${book.author}</p></h3>
                <h3>Pages : <p>&nbsp;${book.pages}</p></h3>
                <h3 id="status">Status : <p>&nbsp;${book.status ? "Read" : "Not Read"}</p></h3>
                <button class="remove" onclick="removeBook(${i})">Remove</button>
                <button class="ReadOrnot" onclick="ReadOrnot(${i})">Toggle Read</button>
            </div>
        `;
        newLibrary.appendChild(eBook);
    }
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#number").value;
    let status = document.querySelector("#status").checked;
    let cover = document.querySelector("#cover").value;

    let myBook = new Book(title, author, pages, status, cover);
    myLibrary.push(myBook);
    saveToLocalStorage(); // Save new book to localStorage
    render();
}

let popup = document.querySelector("#button");
popup.addEventListener("click", function() {
    let displayCard = document.querySelector("#input");
    displayCard.style.display = "block";
});

document.querySelector("#input").addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();

    document.querySelector("#input").style.display = "none";
});

window.onload = render; // Load books when the page loads
