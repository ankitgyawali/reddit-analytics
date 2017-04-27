# Create Drivers to store/fetch/upsert data on mysql or mongodb. Used by api.py.
# import sqlite3
import logging
import configparser
import sqlite3

# Simple Add To Database
def addToDatabase(sql, table,reddit_id,sentiment,entities,catagories):
    try:
        sql.cursor().execute('INSERT INTO "'+ table +'" (reddit_id,sentiment,entities,catagories) values(?,?,?,?) ', [str(reddit_id), str(sentiment),str(entities),str(catagories)])
        sql.commit()
        logging.info("Stored metadata from /r/" + table + " to database.")
    except Exception as e:
        logging.info("Something went wrong while adding to database: "+ str(e))
    return

# Get Everything from database // Whole Day??
def getAll(sql,table):
    return

# Get Some 