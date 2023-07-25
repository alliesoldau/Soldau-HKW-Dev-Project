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

  // extract the column headers from the first object in the data array
  let headers = tableBooks.length > 0 ? Object.keys(tableBooks[0]) : [];
  // remove the id column from the headers array because we don't want to display that
  headers.shift();
  // function to capitalize all words in the string
  function capitalizeAllWords(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  // format the headers to look prettier
  const headersFormatted = headers.map((str) =>
    capitalizeAllWords(str.replace(/_/g, " "))
  );
  // replace the column title url with purchase link -- we'll use the url for the hyperlink
  headersFormatted.pop();
  headersFormatted.push("Purchase Link");

  // map through the table books and fill out each row with the data
  const tableRows = tableBooks.map((book) => (
    <TableRow key={book.id} book={book} />
  ));

  // handles sorting
  function handleSort(index) {
    let sorted = [...tableBooks];
    let selectedHeader = headers[index];
    console.log("selectedHeader", selectedHeader);
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

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {headersFormatted.map((header, index) => (
              <th
                key={headers[index]}
                value={headers[index]}
                onClick={() => {
                  handleSort(index);
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
