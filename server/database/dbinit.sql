CREATE TABLE "all"  ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" BLOB, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)
CREATE TABLE "askreddit"  ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" BLOB, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)
CREATE TABLE "politics"  ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" BLOB, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)
CREATE TABLE "videos"  ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" BLOB, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)
CREATE TABLE "worldnews"  ( "id" INTEGER NOT NULL PRIMARY KEY, "process_datetime" DATETIME DEFAULT CURRENT_TIMESTAMP, "reddit_id" BLOB, "sentiment" TEXT, "entities" TEXT,"catagories" TEXT)


CREATE INDEX IF NOT EXISTS ts_all on "all"(process_datetime)
CREATE INDEX IF NOT EXISTS ts_askreddit on "askreddit"(process_datetime)
CREATE INDEX IF NOT EXISTS ts_politics on "politics"(process_datetime)
CREATE INDEX IF NOT EXISTS ts_videos on "videos"(process_datetime)
CREATE INDEX IF NOT EXISTS ts_worldnews on "worldnews"(process_datetime)
