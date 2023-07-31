import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import HiddenColumns from "./HiddenColumns";
import SearchBar from "./SearchBar";
import TableFilter from "./TableFilter";
import { FaRegEyeSlash, FaSort } from "react-icons/fa";

function Table({ filteredBooks, setFilteredBooks, books }) {
  useEffect(() => {
    setTableBooks([...filteredBooks]);
    let booksHeaders =
      filteredBooks.length > 0 ? Object.keys(filteredBooks[0]) : [];
    booksHeaders.shift();
    booksHeaders.splice(8, 1);
    booksHeaders.push("gmap_url");
    // get our raw headers
    setHeaders(booksHeaders);
    console.log("booksHeaders", booksHeaders);
    // format the headers to look prettier
    let formatted = booksHeaders.map((str) =>
      capitalizeAllWords(str.replace(/_/g, " "))
    );
    formatted.splice(formatted.length - 2, 2);
    formatted.push("Purchase Link");
    setHeadersFormatted(formatted);
    console.log("formattedHeaders", formatted);
  }, [filteredBooks]);
  // create a copy of books so that I can manipulate the order when I want to sort it by a specific column
  const [tableBooks, setTableBooks] = useState([...filteredBooks]);
  const [lastHeader, setLastHeader] = useState();
  const [ascent, setAscent] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [headersFormatted, setHeadersFormatted] = useState([]);
  const [hideShow, setHideShow] = useState([]);

  // create an object which determines if the column is hidden or shown
  useEffect(() => {
    let hideShowObject = headers.reduce((obj, str) => {
      obj[str] = "show";
      return obj;
    }, {});
    setHideShow(hideShowObject);
  }, [headers]);

  // function to capitalize all words in the string
  function capitalizeAllWords(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  // map through the table books and fill out each row with the data
  const tableRows = tableBooks.map((book) => (
    <TableRow key={book.id} book={book} hideShow={hideShow} />
  ));

  // handles sorting
  function handleSort(index) {
    let sorted = [...tableBooks];
    let selectedHeader = headers[index];
    if (
      selectedHeader === "publisher_address" ||
      selectedHeader === "url" ||
      selectedHeader === "genres"
    ) {
      return;
    }
    if (selectedHeader === lastHeader) {
      let previousOrder = ascent;
      setAscent(!previousOrder);
    } else {
      setAscent(true);
    }
    // sort by number and date columns
    if (
      selectedHeader === "page_count" ||
      selectedHeader === "rating" ||
      selectedHeader === "date_completed"
    ) {
      sorted.sort((a, b) => a[selectedHeader] - b[selectedHeader]);
      // sort by text columns
    } else if (selectedHeader === "author" || selectedHeader === "title") {
      function compareAlphas(a, b) {
        const alphaA = a[selectedHeader].toLowerCase();
        const alphaB = b[selectedHeader].toLowerCase();
        if (alphaA < alphaB) {
          return -1;
        }
        if (alphaA > alphaB) {
          return 1;
        }
        return 0;
      }
      sorted.sort(compareAlphas);
    }
    if (!ascent) {
      sorted.reverse();
    }
    setTableBooks(sorted);
    setLastHeader(selectedHeader);
  }

  function handleHideShow(selectedHeader) {
    let previousClassName = hideShow[selectedHeader];
    let currentClassName;
    if (previousClassName === "show") {
      currentClassName = "hide";
    } else {
      currentClassName = "show";
    }
    let updatedHideShow = {
      ...hideShow,
      [selectedHeader]: currentClassName,
    };
    setHideShow(updatedHideShow);
  }

  return (
    <>
      <TableFilter
        hideShow={hideShow}
        setHideShow={setHideShow}
        headers={headers}
        headersFormatted={headersFormatted}
        books={books}
        setFilteredBooks={setFilteredBooks}
      />
      <div className="table">
        {headers.length > 0 ? (
          <table>
            <thead>
              <tr>
                {headersFormatted.map((header, index) => (
                  <th
                    id={headers[index]}
                    key={headers[index]}
                    value={headers[index]}
                    className={hideShow[headers[index]]}
                  >
                    <div className="columnHeader">
                      <div className="iconContainer">
                        <FaRegEyeSlash
                          className="eyeball"
                          onClick={() => {
                            handleHideShow(headers[index]);
                          }}
                        />
                      </div>
                      <div className="headerContainer">
                        <p>{header}</p>
                      </div>
                      {headers[index] === "publisher_address" ||
                      headers[index] === "genres" ||
                      headers[index] === "url" ||
                      headers[index] === "gmap_url" ? null : (
                        <div className="iconContainer">
                          <FaSort
                            className="arrows"
                            onClick={() => {
                              handleSort(index);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}

export default Table;
