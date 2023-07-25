import { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <Table books={books} />
    </div>
  );
}

export default App;
