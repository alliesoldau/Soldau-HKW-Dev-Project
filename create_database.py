import sqlite3
import json

# create and connect to SQL database
connection = sqlite3.connect('book_data.sqlite')
cursor = connection.cursor()

# start fresh each execution
cursor.execute("DROP TABLE if exists books");

# create the books table 
cursor.execute("""CREATE Table if not exists books
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    author STRING,
                    title STRING,
                    date_completed DATETIME,
                    publisher STRING,
                    publisher_address STRING,
                    url STRING,
                    rating FLOAT,
                    page_count INT,
                    genres STRING
                )
                  """)

# open JSON file
f = open('db.json')
  
# returns JSON object as a dictionary
books = json.load(f)
  
# iterate through the json list
for book in books:
    genres_str = ', '.join(book['genres'])
    book_data = (book['author'], book['title'], book['date_completed'], book['publisher'],
                 book['publisher_address'], book['url'], book['rating'], book['page_count'], genres_str)
    cursor.execute("""INSERT INTO books
                    (author, title, date_completed, publisher, publisher_address, url, rating, page_count, genres)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, book_data)
  
# close file 
f.close()


connection.commit()
connection.close()