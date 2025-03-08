import { Link, Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Admin Panel" }];
};

export default function AdminRoute() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/add-book-isbn">Add Book by ISBN</Link>
          </li>
          {/* Add other admin links here */}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
