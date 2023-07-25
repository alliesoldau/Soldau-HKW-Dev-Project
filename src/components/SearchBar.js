import { useState, useEffect } from "react";

function SearchBar({ filteredBooks, books, setFilteredBooks }) {
  // set Up State Variables
  const [searchQuery, setSearchQuery] = useState("");

  // handle Search Input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // filter Data
  useEffect(() => {
    if (books) {
      const filteredResult = books.filter((item) =>
        Object.entries(item).some(([key, value]) => {
          // exclude the url and publisher_address --> searching that isn't helpful to us
          if (key === "url" || key === "publisher_address") return false;
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
      setFilteredBooks(filteredResult);
      console.log(filteredResult);
    }
  }, [searchQuery, books, setFilteredBooks]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search table . . ."
      />
    </div>
  );
}

export default SearchBar;
