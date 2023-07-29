import SearchBar from "./SearchBar";
import HiddenColumns from "./HiddenColumns";

function TableFilter({
  books,
  setFilteredBooks,
  hideShow,
  setHideShow,
  headers,
  headersFormatted,
}) {
  return (
    <div>
      <p>TableFilter</p>
      <HiddenColumns
        hideShow={hideShow}
        setHideShow={setHideShow}
        headers={headers}
        headersFormatted={headersFormatted}
      />
      <SearchBar books={books} setFilteredBooks={setFilteredBooks} />
    </div>
  );
}

export default TableFilter;
