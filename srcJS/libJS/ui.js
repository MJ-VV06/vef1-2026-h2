// js hlutir sem notandi getur séð
import { el, empty } from "./elements.js";
import { searchBooks } from "./books.js";
/** @typedef {import('./main.types.js').Book} Book */

/** sýna bækur
 * 
 * @param {Element} container 
 * @param {Book[]} books 
 * @returns 
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
        const bookEl = el('li', {}, 
            el('a', {href:`/src/book.html?id=${book.id}`},book.title)
        ); //finna ut hvað klassi er sett á þetta seinna, líka bæti við fleiri element þegar við vinnum á frontend
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
        renderBookList(container, searchBooks(books, input.value)) //render the booksss
    });
}

/** NEXT THING, render bok eftir id i searchbarinu
 */
export function renderBookID() {
}