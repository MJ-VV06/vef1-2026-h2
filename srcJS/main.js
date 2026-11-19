import { loadBooks, saveBooks  } from "./libJS/storage.js";
import { addBook, getBookById, addReview, findBookId } from "./libJS/books.js";
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


//ef book-form er til þá er hægt að submita
const bookInputHTML = document.querySelector(".book-form");
if (bookInputHTML) {
    
    // ef submit, ekki refresha
    bookInputHTML.addEventListener('submit', (event) => {
        event.preventDefault();

        //sækja í form data, svo breytta í object
        const formData = new FormData(bookInputHTML);
        const formDataObject = Object.fromEntries(formData.entries());

        // reyna
        try {
            //bæta við bókina
            addBook(data, formDataObject);

            //save í json
            saveBooks(data);

            // hreinsa form
            bookInputHTML.reset();

        } catch (error) {
            console.error(error);
        }
    })
}

//ef review form er til
const reviewInputHTML = document.querySelector(".dropdown-form");
if (reviewInputHTML) {

    //no refresh submit
    reviewInputHTML.addEventListener('submit', (event) => {
        event.preventDefault();

        //sækja í form data og breytta í object
        const formData = new FormData(reviewInputHTML);
        const formDataObject = Object.fromEntries(formData.entries());

        // reyna
        try {

            //finna bok id sem við erum á
            const bookID = findBookId();

            //eff null skila undef, annar sækja í bókina með id
            const book = bookID === null? undefined : getBookById(data, bookID);

            //bók ekki til kasta error
            if (!book) {
                throw new Error("no book");
            }

            //bæta við review
            addReview(book,formDataObject.rating,formDataObject.description,formDataObject.startedDate,formDataObject.finishedDate);

            //save í json
            saveBooks(data);


            // sýna review á síðuna
            const reviewList = document.querySelector(".review-list");
            if (reviewList) {
                empty(reviewList);
                renderReviews(reviewList, book);
            }

            reviewInputHTML.reset(); // hreinsa review form

        } catch (error) {
            console.error(error);
        }
    });
}
