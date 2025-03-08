import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Scan QR Code" }];
};

export default function ScanQRCodeRoute() {
  return (
    <div>
      <h1>Scan QR Code to Borrow a Book</h1>
      <p>
        Use your phone's camera to scan the QR code on the book.
      </p>
      {/* Placeholder for QR code scanning functionality - to be implemented later */}
      <p>
        Alternatively, you can enter the book ISBN manually:
        <Link to="/borrow/isbn-entry">Enter ISBN</Link>
      </p>
    </div>
  );
}
