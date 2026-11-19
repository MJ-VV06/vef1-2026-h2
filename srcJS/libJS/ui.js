// js hlutir sem notandi getur séð
import { el, empty } from "./elements.js";
import { searchBooks, averageRating} from "./books.js";
/** @typedef {import('./main.types.js').Book} Book */

/** sýna bækur
 * 
 * @param {Element} container 
 * @param {Book[]} books 
 */
export function renderBookList(container, books) {
    empty(container); // hreinsa

    // ef ekkert, þá ekkert fansst
    if(books.length === 0) {
        container.appendChild(el("li", {}, "Engar bækur fundust"));
        return;
    }
    // fara í gegnum list og gera element
    for (const book of books) {
        // cover ef til annars nota placeholder
        const cover = book.cover ? book.cover : `/images/cover-placeholder-${book.id % 4}.svg`;

        const bookEl = el('li', { class:"targethref"}, 
            el('a', {href:`/src/book.html?id=${book.id}`},  
                el('img', {src:cover, alt:book.title+" cover" }),
                el('h1', {}, book.title)
            )
        ); 

        container.appendChild(bookEl); 
    }
}

/** searchbar
 * @param {*} input 
 * @param {Element} container 
 * @param {Book[]} books 
 */
export function setupSearch(input, container, books) {
    //searchbar event í hvern skipti sem skrifað í searchbar
    input.addEventListener("input", () => {
        //hreinsa
        const text = input.value.trim();

        // ef ekkert þá hreinsa og ekki rendera neitt
        if (text === "") {
            empty(container);
            return;
        }


        renderBookList(container, searchBooks(books, text)) //render the booksss
    });
    
}

/** sýna book
 * @param {Element} container
 * @param {Book} book 
 */
export function renderBook(container, book) {

    //hreinsa
    empty(container);

    //ef ekki book cover, module id til að fá placeholder
    const cover = book.cover ? book.cover : `/images/cover-placeholder-${book.id % 4}.svg`;
    
    // gera element fyrir each hlut í objectið
    container.appendChild(el('img', {src:cover,class:"book-cover", alt:book.title+" cover"}));
    container.appendChild(el('h1', {class:"book-title"}, book.title));
    container.appendChild(el('p', {class:"book-author"}, book.author || "By unknown author"));
    container.appendChild(el('p', {class:"book-date"}, book.releaseDate || "unknown release date"));
    container.appendChild(el('p', {class:"book-description"}, book.description || "Nothing here..."));
    
    //finna avg rating ef til, render avg, annars no reviews
    const avg = averageRating(book);
    if (avg) {
        container.appendChild(renderStars(Math.round(avg)));
    }
    else {
        container.appendChild(el("p", { class: "book-review-average" }, "No Reviews Yet"));
    }

}


/** Sýna reviews
 * @param {Element} list
 * @param {Book} book
 */
export function renderReviews(list, book) {

    // ef ekkert revies ger li með no reviews message
    if (book.reviews.length === 0) {
        list.appendChild(el('li', {}, "Engar umsagnir ennþá"));
    }

    // ef til þá fara í gegnum
    for (const review of book.reviews) {

        // item
        const item = el('li', {}, 
            renderStars(review.rating),
            el('p', {class:"review-description"}, review.description || " ")
        )

        // ef review date er til, þá sýna annars hafa empty, hinn verður þá ? ef ekki til
        if (review.startedDate || review.finishedDate) {
            item.appendChild(el("p", { class: "review-dates" }, `${review.startedDate || "?"} - ${review.finishedDate || "?"}`));
        }

        // setja í container
        list.appendChild(item);
    }
}


/** render stars
 * @param {number} rating
 */
function renderStars(rating) {
    const container = el("div", { class: "stars-container" }); // container fyrir öll img

    // loop 10 út af því rating er 1-10
    for (let i = 1; i <= 10; i++) {

        // 1 start, 0 lok, modulo með 2
        const side = i % 2 === 1 ? "open" : "close";  
        
        // ef i minna en rating, þá er það "selected" og "filles"
        const fill = i <= rating ? "full" : "empty";

        // gera img og appenda
        container.appendChild(el("img", {src: `/images/star-${side}-${fill}.svg`,alt: "star",height:"16px"}));
    }
    // skilur til baka container
    return container;
}

