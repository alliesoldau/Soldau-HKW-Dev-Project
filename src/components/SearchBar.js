import { useState, useEffect } from "react";

function SearchBar({ filteredBooks, setFilteredBooks }) {
  // Step 1: Set Up State Variables
  const [searchQuery, setSearchQuery] = useState("");

  // Step 3: Handle Search Input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Step 4: Filter Data
  useEffect(() => {
    if (filteredBooks) {
      const filteredResult = filteredBooks.filter(
        (item) => item.title?.toLowerCase().includes(searchQuery.toLowerCase()) // Use optional chaining
      );
      setFilteredBooks(filteredResult);
      console.log(filteredResult);
    }
  }, [searchQuery]);

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
