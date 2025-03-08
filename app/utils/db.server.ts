import initSqlJs from 'sql.js';

let db;

async function initializeDB() {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  db = new SQL.Database();
}

async function getDB() {
  if (!db) {
    await initializeDB();
  }
  return db;
}

export default getDB;
