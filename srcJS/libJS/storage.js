// allt tengd færa inn og út gögn í JSON
//imports 
/** @typedef {import('./main.types.js').Book} Book */


/** Sækja í json skrá
 * @returns {Promise<Book[]>} */
export async function loadBooks() {
  const data = await fetch("/srcJS/books.json"); // sækja gögn frá repo root
  if (!data.ok) throw new Error(`Could not load books: ${data.status}`); // ef ekki til
  return await data.json();
}
