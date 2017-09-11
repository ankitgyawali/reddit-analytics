import sqlite3

# Initialize tables
def initializeDB(sql,tables,logging):
    thisWeekView = 'CREATE VIEW thisWeek AS '
    viewselects = []
    for index, table in enumerate(tables):
        sql.cursor().execute('CREATE TABLE  IF NOT EXISTS "'+ table + '" ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" TEXT, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)')
        sql.cursor().execute('CREATE INDEX IF NOT EXISTS ts_'+ table + ' on "'+ table + '" (process_datetime)')
        viewselects.append('SELECT "'+str(index)+'" as id, process_datetime,reddit_id ,sentiment ,entities ,catagories FROM "'+table+'" WHERE DATE(process_datetime) >= DATE("now", "-7 days")')
        logging.info("Initialized table: " + table)
    thisWeekView += ' UNION ALL '.join(viewselects)
    logging.info(thisWeekView)
    sql.cursor().execute('DROP VIEW IF EXISTS thisWeek')
    sql.cursor().execute(thisWeekView)
    sql.commit()
    return
