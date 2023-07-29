import { useState, useEffect } from "react";

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
          // exclude the url and publisher_address --> searching that isn't helpful to us
          if (
            key === "url" ||
            key === "publisher_address" ||
            key === "date_completed" ||
            key === "rating" ||
            // key === "publisher" ||
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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search... "
      />
    </div>
  );
}

export default SearchBar;
