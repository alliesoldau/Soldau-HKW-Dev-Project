# Allie Soldau - HKW Dev Project

## Project Requirements:

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

## Database Troubleshooting

- If your database isn't populated, try resetting the database
  - Delete the `book_data.sqlite` file from the root directory
  - Run `python3 create_database.py` in your terminal to reset the database
  - Open the newly created `book_data.sqlite` file, click the refresh spiral arrow in the top left of the database screen, and click on the `books` table. This should display the books table with all cells filled out

## Project Planning

[Figma](https://www.figma.com/file/Z08wB30svjVtii540HaeXy/Soldau---HKW-Dev-Project?type=whiteboard&node-id=2%3A76867&t=MQkMvvr9dBoFbVBp-1)

- Contains timeline and website skeletons

[DBDiagram](https://dbdiagram.io/d/64c542ee02bd1c4a5ee86707)

- Contains database planning

## Project Overview

This project was created with a React front end and SQLite3 backend. It is meant to be run locally.

The backend was populated via a Python3 script. The database will come to you pre-loaded, but you can view the `create_database.py` file if you want to see how I created the SQLite3 database and populated it with data from the `db.json` file.

I chose to create a table displaying the books I've read thus far in 2023. When displayed on the frontend, the table format is as follows:

**2023 Book Log**
| Title | Author | Rating | Page Count | Genres | Date Completed | Publisher | Publisher Address | Purchase Link |
|:-----:|:------:|:------:|:----------:|:------:|:--------------:|:---------:|:-----------------:|:-------------:|
| xxx | xxx | xxx | xxx | xxx | xxx | xxx | xxx(link) | -->(link) |
| yyy | yyy | yyy | yyy | yyy | yyy | yyy | yyy(link) | -->(link) |
| zzz | zzz | zzz | zzz | zzz | zzz | zzz | zzz(link) | -->(link) |

## Project Features

**Sorting**

- Hovering over the column headers will reveal a sorting UI button next to the header title
- You can toggle the sort between ascending and descending by clicking on the sort button
- Columns where sorting doesn't make sense will not display a sorting icon

**Searching**

- You can search the table using the search bar on the top right of the screen
- I limited the search area to title, author, publisher, and genres
- The search feature is "live", so as you type it will filter the table

**Hidding Columns**

- Hovering over the column headers will reveal a hide UI button next to the header title
- You can hide that column by clicking on the eyeball button
- The column will immediately disappear from the table

**Un-Hidding Columns**

- To re-display a column that you've hidden, you can go to the Hidden Columns drop down in the top left hand side of the screen and select which column you want to add back into the table

**External Links**

- Clicking on an address in the Publisher Address column will take you to a new tab with a GoogleMaps display of the publisher's address
- Clicking on the link icon in the Purchase Link column will take you to a new tab where you can purchase the book

## Future Improvements

**Mobile Formatting**

- I opted to format this website to be suitable for laptops and monitors. It is not optimized for a mobile device. If this were a real-life project, I would add in conditional formmating for a mobile environment

**Loading Screen**

- If this were a real-life project I would ensure that a loading screen was present while the data was being fetched on the backend. Since this is being run locally and the site is so small, it never loads slowly enough for you to be able to see such a screen, so I omitted it from this project
