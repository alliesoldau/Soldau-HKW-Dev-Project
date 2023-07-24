import sqlite3
import datetime

# create and connect to SQL database
connection = sqlite3.connect('sales_data.sqlite')
cursor = connection.cursor()

# start fresh each execution
cursor.execute("DROP TABLE if exists books");

# create the books table 
cursor.execute("""CREATE Table if not exists books
                (
                    id int primary_key, 
                    author string,
                    title string,
                    date_completed datetime
                    publication_year int,
                    publisher string,
                    publisher_address string,
                    url string,
                    rating float,
                    page_count int,
                    genres string
                )
                  """)

connection.commit()
connection.close()