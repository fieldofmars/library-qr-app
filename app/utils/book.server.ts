import db from "./db.server";

interface BookDetails {
  isbn: string;
  title: string;
  author: string;
  genre?: string;
  image?: string;
}

export async function createBook(bookDetails: BookDetails) {
  try {
    await db.run(
      `INSERT INTO books (isbn, title, author, genre) VALUES (?, ?, ?, ?)`,
      [bookDetails.isbn, bookDetails.title, bookDetails.author, bookDetails.genre]
    );
    return { success: true };
  } catch (error) {
    console.error("Database error creating book:", error);
    return { success: false, error: "Failed to add book to database." };
  }
}

export async function getBookByIsbn(isbn: string) {
  try {
    const book = await db.get(
      `SELECT * FROM books WHERE isbn = ?`,
      [isbn]
    );
    return book || null;
  } catch (error) {
    console.error("Database error fetching book by ISBN:", error);
    return null;
  }
}
