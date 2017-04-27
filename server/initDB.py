import sqlite3

# Initialize tables
def initializeDB(sql,tables,logging):
    for table in tables:
        sql.cursor().execute('CREATE TABLE  IF NOT EXISTS "'+ table + '" ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" TEXT, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)')
        sql.cursor().execute('CREATE INDEX IF NOT EXISTS ts_'+ table + ' on "'+ table + '" (process_datetime)')
        logging.info("Initialized table: " + table)
    sql.commit()
    return
