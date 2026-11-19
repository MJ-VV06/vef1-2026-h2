// js tengd bækur 
/** @typedef {import('./main.types.js').Book} Book */


/** sækja úr Books ef leitað af sérstaka bók 
 * @param {Book[]} books 
 * @param {number} id 
 * @returns {Book | undefined} */
export function getBookById(books, id) {

    // finna ef id af bókina er til
    for (const book of books) {
        if (book.id === id) {
            return book;
    }
  }
  return;
}

/** bæta við bók í JSON
 * @param {Book[]} books
 * @param {{title: string, author: string, description?: string, cover?: string, releaseDate: string}} data
 */
export function addBook(books, data) {

    //kíkir ef til annars villa
    const title = data.title?.trim();

    // ef til, þarf samt ekki
    const author = data.author?.trim() ?? "";
    const description = data.description?.trim() ?? "";
    const cover = data.cover?.trim() ?? "";
    const releaseDate = data.releaseDate?.trim() ?? "";

    if (!title) {
        throw new Error("vantar titill");
    }

    // updated, fer í gegnum ids í books, stærsta id plús 1
    let maxId = 0;
    for (const book of books) {
        if (maxId <= book.id) {
            maxId = book.id;
        }
    }

    //bættir við í book object og svo bætt við í Books dataið
    const book = {
        id: maxId + 1, 
        title: title,
        author: author,
        description: description,
        cover: cover,
        releaseDate: releaseDate,
        reviews: []
  };

  books.push(book);

}


/** medaltal einkunn ef til
 * @param {Book} book
 * @returns {number | null}
 */
export function averageRating(book) {
    if (book.reviews.length === 0) {
        return null;
    }

    let count = 0;

    for (const review of book.reviews) {
        count += review.rating;
    }

    let avg = count/book.reviews.length;

    return avg;
}

/** baetir vid review
 * @param {Book} book
 * @param {number | string} rating veit ekki hvort vid notum string eda int i form
 * @param {string} description
 * @param {string} startedDate
 * @param {string} finishedDate
 */
export function addReview(book, rating, description, startedDate, finishedDate) {
    // held að form gefur String man ekki, munn breytta ef þar en þetta virkar núna
    const value = Number(rating);

    if (!Number.isInteger(value) || value < 1 || value > 10) { // eitthvað fer vitlaust somehow (ætti ekki að gerast)
        throw new Error("Value er med error"); // test message
    }


    // same stuff fyrir allt, ef til tirm, annar blank
    const text = description?.trim() ?? "";
    const startDate = startedDate?.trim() ?? "";
    const endDate = finishedDate?.trim() ?? "";

    // start og enddate errors
    if (startDate && endDate && endDate < startDate) {
        throw new Error("Klára bókina áður en þú lesir það, how????");
    }


    // bætir við reviewið við bókina
    book.reviews.push({
        rating: value,
        description: text,
        startedDate: startDate,
        finishedDate: endDate
    });
}


/** leitir bækur
 * 
 * @param {Book[]} books 
 * @param {string} search 
 * @returns {Book[]}
 */
export function searchBooks(books, search) {

    //hreinsa String frá searchbar
    const text = search.trim().toLowerCase();

    let bookArray = []; // heldur inn bækur sem hafa text í titil sitt

    // leitir af bók með titl sem hefur text, ef meira en 10 þá sýna það
    for (const book of books) {
        if (book.title.toLowerCase().includes(text)) {
            bookArray.push(book);

            if (bookArray.length > 9) {
                return bookArray;
            }
        }
    }

    // ef ekkert til þá return empty array, annars er smá sem verður returned í stað
    if (bookArray.length === 0) {
        return [];
    }
    return bookArray;
}

/** til að finna id
 * @returns {number | null}
 */
export function findBookId() {
    // kíkir fyrir id annars senda null
    const rawId = new URLSearchParams(window.location.search).get("id");
    if (rawId === null || rawId === "") {
        return null;
    }

    // breyttir id í number, ef það er ekki number þá null
    const id = Number(rawId);
    if (!Number.isInteger(id)) {
        return null;
    }
    return id;
}