import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";

function Table({ books }) {
  useEffect(() => {
    setTableBooks([...books]);
  }, [books]);
  // create a copy of books so that I can manipulate the order when I want to sort it by a specific column
  const [tableBooks, setTableBooks] = useState([...books]);
  const [lastHeader, setLastHeader] = useState();
  const [ascent, setAscent] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [headersFormatted, setHeadersFormatted] = useState([]);
  const [hideShow, setHideShow] = useState([]);

  // every time tableBooks updates we can get our headers
  useEffect(() => {
    let booksHeaders = tableBooks.length > 0 ? Object.keys(tableBooks[0]) : [];
    booksHeaders.shift();
    // get our raw headers
    setHeaders(booksHeaders);
    // format the headers to look prettier
    let formatted = booksHeaders.map((str) =>
      capitalizeAllWords(str.replace(/_/g, " "))
    );
    formatted.pop();
    formatted.push("Purchase Link");
    setHeadersFormatted(formatted);
  }, [tableBooks]);

  // create an object which determines if the column is hidden or shown
  useEffect(() => {
    let hideShowObject = headers.reduce((obj, str) => {
      obj[str] = false;
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
    <TableRow key={book.id} book={book} />
  ));

  // handles sorting
  function handleSort(index) {
    console.log("sort");
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
    console.log("x");
    let updatedHideShow = {
      ...hideShow,
      [selectedHeader]: !hideShow[selectedHeader],
    };
    setHideShow(updatedHideShow);
    console.log(updatedHideShow);
  }

  return (
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
                  hidden={hideShow[headers[index]]}
                >
                  <div>
                    <p
                      onClick={() => {
                        handleSort(index);
                      }}
                    >
                      {header}{" "}
                    </p>
                    <p
                      onClick={() => {
                        handleHideShow(headers[index]);
                      }}
                    >
                      X
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Table;
