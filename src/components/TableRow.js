function TableRow({ book, hideShow }) {
  // turn the genres string into an array so we can map through it and display it programatically
  const genres = book.genres.split(", ");
  // format the date to be more standard
  function formatDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // get the month name based on the month value (subtract 1 from the month as it's zero-based)
    const monthName = monthNames[parseInt(month, 10) - 1];

    // format the date as "dd **name of the month** yyyy"
    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  }

  const formattedDate = formatDate(book.date_completed.toString());

  // TO DO: hide/show columns based on click

  return (
    <tr key={book.id}>
      <td key="title" id="title" className={hideShow.title}>
        {book.title}
      </td>
      <td key="author" id="author" className={hideShow.author}>
        {book.author}
      </td>
      <td key="rating" id="rating" className={hideShow.rating}>
        <div
          className="stars"
          style={{ "--rating": book.rating }}
          aria-label="Rating of this product is 2.3 out of 5."
        ></div>
      </td>
      <td key="page-count" id="page-count" className={hideShow.page_count}>
        {book.page_count}
      </td>
      <td key="genres" id="genres" className={hideShow.genres}>
        <div className="genres-container">
          {genres.map((word, index) => (
            <div key={index} id="genre" className={word}>
              {word}
            </div>
          ))}
        </div>
      </td>
      <td key="date-completed" id="date" className={hideShow.date_completed}>
        {formattedDate}
      </td>
      <td key="publisher" id="publisher" className={hideShow.publisher}>
        {book.publisher}
      </td>
      <td
        key="publisher-address"
        id="address"
        className={hideShow.publisher_address}
      >
        {book.publisher_address}
      </td>
      <td key="url" id="url" className={hideShow.url}>
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          LINK
        </a>
      </td>
    </tr>
  );
}

export default TableRow;
