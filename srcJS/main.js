import { loadBooks  } from "./libJS/storage.js";
import { addBook, averageRating, getBookById, addReview, searchBooks, findBookId } from "./libJS/books.js";
import { renderBookList, setupSearch, renderBook, renderReviews } from "./libJS/ui.js";
import {el, empty} from "./libJS/elements.js"
const data = await loadBooks();
const input = document.querySelector("#book-search-input"); // allar síður hafa
const searchForm = document.querySelector(".book-searcher form");

// hætta serach frá að refresha
if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}

//container sem munn innihalda serach results
const searchHTML = document.querySelector(".search-results");

// serachbox virkar á allar síður
if (input && searchHTML) {
    setupSearch(input, searchHTML, data);
}


//ef við erum á  index síðu
const indexHTML = document.querySelector(".book-list");
if (indexHTML) {
    //render lista af books
    renderBookList(indexHTML, data);
}


//ef við erum á book síðu
const bookHTML = document.querySelector(".book-container");
if (bookHTML) {

    //finna id books sípuna
    const bookID = findBookId();

    // ef bookid er null, þá gera undefined þannig það fer í else, annars sækja í 
    const book = bookID === null ? undefined : getBookById(data, bookID);

    if (book) {
        renderBook(bookHTML, book);

        // kíkja ef review list er til
        const reviewList = document.querySelector(".review-list");
        if (reviewList) {
        renderReviews(reviewList, book);
        }
    } 
    else {
        empty(bookHTML);
        bookHTML.appendChild(el("h1", {}, "Bók fannst ekki"));
    }
}



const bookInputHTML = document.querySelector(".book-form");

if (bookInputHTML) {
    console.log("hi");
    bookInputHTML.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(bookInputHTML);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    })
}
/** 
const reviewInputHTML = document.querySelector(".dropdown-form");
if (reviewInputHTML) {
    reviewInputHTML.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(reviewInputHTML);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Data:', data);
    })
}
    */