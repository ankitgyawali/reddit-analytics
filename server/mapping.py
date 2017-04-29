# Initialize http server and expose rest-api to do crud on database by using database-driver.py. Used by client side with D3 & Angular.js
# import sqlite3
import re, requests, sqlite3, logging, configparser, time, json
import os


config = configparser.ConfigParser()
config.readfp(open(r'config.ini'))

sql = sqlite3.connect(config.get('DATABASE', 'DB_FILENAME'))
cur = sql.cursor()



data = cur.execute("SELECT * FROM thisWeek").fetchall()

data = list(data)
# print(data)
for d in data:
    print(''.join(list(d)))
# print(type(data))
# strx = ''.join((map(str,data)))
# print(strx.replace("\\'","'"))
