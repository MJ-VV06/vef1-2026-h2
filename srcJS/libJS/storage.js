// allt tengd færa inn og út gögn í JSON
//imports 
/** @typedef {import('./main.types.js').Book} Book */

//key fyrir localStroage
const KEY = "books";

/** saver books í localStorage https://www.w3schools.com/jsref/prop_win_localstorage.asp thank you we3 schools
 * @param {Book[]} books 
 */
export function saveBooks(books) {
  localStorage.setItem(KEY, JSON.stringify(books));
}

/** Sækja í json skrá
 * @returns {Promise<Book[]>} */
export async function loadBooks() {

  // sækir í localStorage Data og returns
  const saved = localStorage.getItem(KEY);
  if (saved) {
    return JSON.parse(saved);
  }

  //annars fyrst time load no local storage so þá þarf að sækja json gögn í fyrsta skipti
  const data = await fetch("/srcJS/books.json"); // sækja gögn frá repo root
  if (!data.ok) throw new Error(`no books: ${data.status}`); // ef ekki til
  
  //sækja json
  const books = await data.json();

  // save í localStorage
  saveBooks(books);
  
  return books;
}
