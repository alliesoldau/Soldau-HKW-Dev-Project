// import { useState } from "react";
import TableRow from "./TableRow";

function Table({ books }) {
  // create a copy of books so that I can manipulate the order when I want to sort it by a specific column
  const tableBooks = [...books];
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

  return (
    <>
      <table>
        <thead>
          <tr>
            {headersFormatted.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}

export default Table;
