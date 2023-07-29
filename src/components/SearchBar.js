import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa";

function SearchBar({ books, setFilteredBooks }) {
  // set Up state variables
  const [searchQuery, setSearchQuery] = useState("");

  // handle search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // filter Data
  useEffect(() => {
    if (books) {
      const filteredResult = books.filter((item) =>
        Object.entries(item).some(([key, value]) => {
          // exclude these columns --> searching them isn't helpful to us
          if (
            key === "url" ||
            key === "publisher_address" ||
            key === "date_completed" ||
            key === "rating" ||
            key === "gmap_url"
          )
            return false;
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
      setFilteredBooks(filteredResult);
    }
  }, [searchQuery, books, setFilteredBooks]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="search-bar-input"
      />
    </div>
  );
}

export default SearchBar;
