import { loadBooks  } from "./libJS/storage.js";
import { addBook, averageRating, getBookById, addReview, searchBooks } from "./libJS/books.js";
import { renderBookList, setupSearch } from "./libJS/ui.js";

const data = await loadBooks();
