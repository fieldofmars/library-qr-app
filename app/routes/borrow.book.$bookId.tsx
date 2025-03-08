import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Borrow Book" }];
};

export default function BorrowBookRoute() {
  return (
    <div>
      <h1>Borrow Book</h1>
      {/* Book details will be displayed here based on bookId */}
      <p>Book ID: $bookId</p>
      <p>Book Title: [Book Title Here]</p>
      <p>
        <button>Confirm Borrow</button>
      </p>
    </div>
  );
}
