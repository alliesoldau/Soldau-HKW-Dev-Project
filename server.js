const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

const dbPath = "./book_data.sqlite";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

app.get("/books", (req, res) => {
  // query sqlite3 database here and return the data as a JSON response
  db.all("SELECT * FROM books;", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
