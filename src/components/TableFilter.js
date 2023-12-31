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
    <div className="table-filter">
      <HiddenColumns
        hideShow={hideShow}
        setHideShow={setHideShow}
        headers={headers}
        headersFormatted={headersFormatted}
      />
      <p className="table-title">2023 Book Log</p>
      <SearchBar books={books} setFilteredBooks={setFilteredBooks} />
    </div>
  );
}

export default TableFilter;
