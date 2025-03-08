import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";
import { createBook } from "~/utils/book.server"; // We'll create this utility

export const meta: MetaFunction = () => {
  return [{ title: "Add Book by ISBN" }];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const isbn = formData.get("isbn") as string;
  if (!isbn) {
    return { errors: { isbn: "ISBN is required" } };
  }

  try {
    const bookDetails = await fetchBookDetailsFromIsbn(isbn);
    if (bookDetails) {
      await createBook(bookDetails);
      return { success: true };
    } else {
      return { errors: { isbn: "Book not found for this ISBN" } };
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    return { errors: { isbn: "Error fetching book details" } };
  }
};

async function fetchBookDetailsFromIsbn(isbn: string) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    const book = data.items[0].volumeInfo;
    return {
      isbn: isbn,
      title: book.title,
      author: book.authors ? book.authors.join(', ') : 'Unknown Author',
      genre: book.categories ? book.categories.join(', ') : 'Unknown Genre',
      image: book.imageLinks?.thumbnail, // Optional image
    };
  }
  return null;
}


export default function AddBookISBNRoute() {
  const [isbn, setIsbn] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    formData.set("isbn", isbn); // Ensure ISBN is in FormData

    const response = await fetch("/admin/add-book-isbn", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.errors) {
      setErrors(result.errors);
    } else if (result.success) {
      setSuccess(true);
      setIsbn(""); // Clear the input after successful submission
      setTimeout(() => setSuccess(false), 3000); // Success message timeout
    }
  };


  return (
    <div>
      <h1>Add Book by ISBN</h1>
      {success && <p style={{ color: 'green' }}>Book added successfully!</p>}
      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            aria-invalid={!!errors.isbn}
          />
          {errors.isbn && <span style={{ color: 'red' }} className="error-message">{errors.isbn}</span>}
        </div>
        <button type="submit">Add Book</button>
      </Form>
    </div>
  );
}
