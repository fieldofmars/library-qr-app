import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Enter Book ISBN" }];
};

export default function EnterISBNRoute() {
  const [isbn, setIsbn] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // In a real app, you would validate ISBN and fetch book details
    navigate(`/borrow/book/${isbn}`);
  };

  return (
    <div>
      <h1>Enter Book ISBN</h1>
      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <button type="submit">Borrow Book</button>
      </Form>
    </div>
  );
}
