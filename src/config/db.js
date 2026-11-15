import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.log("Errore nell'inzializzazione del DB : ", err);
  }
  else {
    initializeDatabase();
    console.log("Database inizializzato");
  }
})

function initializeDatabase() {
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');
    db.run(`
      CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
      )
      `);
    db.run(`
      CREATE TABLE IF NOT EXISTS tickets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        is_confidential INTEGER DEFAULT 0,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
      `)
  });
}

export default db;