import "./index.css";
// import axios from "axios";
import { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [books, setBooks] = useState({});

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <p>hey</p>
      <Table />
    </div>
  );
}

export default App;
