import { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <Table
        filteredBooks={filteredBooks}
        books={books}
        setFilteredBooks={setFilteredBooks}
      />
    </div>
  );
}

export default App;
