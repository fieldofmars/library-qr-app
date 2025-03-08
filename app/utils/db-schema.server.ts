import db from './db.server';

db.exec(\`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    isbn TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    qr_code TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    borrow_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME
  );
\`);
