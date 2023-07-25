function TableRow({ book }) {
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

  return (
    <tr key={book.id}>
      <td key="title">{book.title}</td>
      <td key="author">{book.author}</td>
      <td key="rating">{book.rating}</td>
      <td key="page-count">{book.page_count}</td>
      <td key="genres">
        {genres.map((word, index) => (
          <p key={index} className={word}>
            {word}
          </p>
        ))}
      </td>
      <td key="date-completed">{formattedDate}</td>
      <td key="publisher">{book.publisher}</td>
      <td key="publisher-address">{book.publisher_address}</td>
      <td key="url">
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          LINK
        </a>
      </td>
    </tr>
  );
}

export default TableRow;
