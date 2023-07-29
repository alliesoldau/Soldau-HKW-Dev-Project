# Allie Soldau - HKW Dev Project

## Instructions for How to Run the Code

1. Install all dependancies

   - Run `npm install` in your terminal

2. Double check you are running version 18.2.0 of React

   - Run `npm view react version` in your terminal

3. Run the local server

   - Run `node server.js` in your terminal to run the server and connect to the sqlite3 database
   - You can visit [http://localhost:3000/books](http://localhost:3000/books) to view the raw data

4. Start the React file
   - Open a web browser (preferably GoogleChrome or Safari)
   - Run `npm start` in your terminal to launch the frontend
   - This should automatically open a new tab in your browser window
   - If you don't see it, try visiting [http://localhost:4000/](http://localhost:4000/) from your browser address bar

## Database shooting

- Reset the database
  - Delete the `book_data.sqlite` file from the root directory
  - Run `python3 create_database.py` in your terminal to reset the database
  - Open the newly created `book_data.sqlite` file, click the refresh spiral arrow in the top left of the database screen, and click on the `books` table. This should display the books table with all cells filled out


<!-- TO DO: make sure the site is all accessible!  -->

# Here are the project requirements we talked about:

A frontend table built with React that displays data from a database (example data from any subject is fine).
This table should contain:

- 8 columns and at least 20 rows of data
- 1 column should contain dates
- 1 column should contain numbers
- 1 column should contain an alphanumeric string
- 1 column should contain text and a hyperlink

UI requirements:

- A search input that filters the data
- Sortable column data with a UI indicator
- A UI feature that allows the user to hide/show the table columns

Feel free to include any other UI elements or interactions with this table that you would like, but the only items required for presentation are those above.
