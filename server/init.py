# Initialize reddit to get comments, process those comments via rosette api and parse them for sending db friendly data to database-driver.py
import praw, time, re, requests, json, sqlite3, logging, configparser, ast

from rosette.api import API, DocumentParameters, MorphologyOutput
import rosette.api

import initDataPocessor
import initDB
import databaseDriver

config = configparser.ConfigParser()
config.readfp(open(r'config.ini'))

sql = sqlite3.connect(config.get('DATABASE', 'DB_FILENAME'))

# Bot Configs
# SLEEPTIME = int(config.get('SLEEPTIME', 'TIME'))
categorymappings = json.loads(config.get('MAPPING', 'CATEGORY_MAPPING'))

logging.basicConfig(
    format = '[%(asctime)s] %(levelname)s: %(name)s: %(message)s',
    filename = config.get('LOGGING', 'LOG_FILENAME'),
level=logging.INFO)

logging.info('Scraping data from reddit for reddit-analytics..')

if(config.get('DATABASE', 'INIT_DB')== "True"):
    initDB.initializeDB(sql,ast.literal_eval(config.get('ALL', 'SUBREDDITS')),logging)

try:
    reddit = praw.Reddit(client_id=config.get('PRAW_DETAILS', 'CLIENT_ID'),
                     client_secret=config.get('PRAW_DETAILS', 'CLIENT_SECRET'),
                     password=config.get('PRAW_DETAILS', 'BOT_PASSWORD'),
                     user_agent=config.get('PRAW_DETAILS', 'USERAGENT'),
                     username=config.get('PRAW_DETAILS', 'BOT_USERNAME'))
except:
    logging.info("Cannot login into reddit")

api = API(config.get('ROSETTE', 'ROSSETE_API_KEY'))
params = DocumentParameters()

def classifyComment(comment):
    return "processsed"

def categoryMapper(category):
    try:
        return categorymappings[category]
    except:
        return category


def processASubmission(submission):
    singleComment = []
    submission.comments.replace_more(limit=0)
    for comment in submission.comments.list():
        singleComment.append(comment.body)
    commentToReturn = ' '.join(singleComment)
    commentToReturn = commentToReturn.rstrip('\r\n')
    return commentToReturn[:48950]
    # return singleComment
# logging.info(api.categories(params))

def processASubReddit(subreddit,params):
    try:
        submissions = reddit.subreddit(subreddit).hot(limit=int(config.get('ALL', 'NUMBER_OF_POSTS')))
    except Exception as e:
        logging.info("Error with reddit API while fetching posts from /r/"+subreddit+": "+ str(e))
        return [[],True]
    entities = []
    sentiment = []
    catagories = []
    reddit_id = []
    error = False
    for submission in submissions: #sleep 3 sec here #Returns a single post for each submission
        try:
            params['content'] = processASubmission(submission)
            # try:
            cat = api.categories(params)['categories']
            cats = []
            for c in cat:
                cats.append(json.dumps({'l': categoryMapper(c['label']), 'c': str(c['confidence'])[2:4]}))
            catagories.append(cats)
            # except Exception as e:
            #     logging.info('Sleeping between submission ['+submission.id+'] on category api because: '+ str(e))                
            #     time.sleep(int(config.get('SLEEPTIME', 'SLEEP_BETWEEN_API_CALLS')))
            time.sleep(int(config.get('SLEEPTIME', 'ROSETTE_SLEEP')))
            sentities = api.sentiment(params)
            sentis = sentities['document']
            entis = sentities['entities'][:5]
            newentis = []
            for e in entis:
                newentis.append(json.dumps({'l': e['sentiment']['label'],'c':str(e['sentiment']['confidence'])[2:4],'n':e['normalized'],'o':e['count']}))
            sentiment.append(json.dumps({'l': sentis['label'], 'c': str(sentis['confidence'])[2:4]}))
            entities.append(newentis)
            reddit_id.append(submission.id)
        except Exception as e:
            logging.info('Error for submission ['+submission.id+'] while calling rosette API: '+ str(e))
            logging.info('Sleeping Extra sec: '+ str(config.get('SLEEPTIME', 'ROSETTE_SLEEP')))
            time.sleep(int(config.get('SLEEPTIME', 'ERROR_SLEEP')))
            continue
            # return [[],True]
        time.sleep(int(config.get('SLEEPTIME', 'ROSETTE_SLEEP')))
    return [[subreddit,reddit_id,sentiment,entities,catagories],None]


for subreddit in ast.literal_eval(config.get('ALL', 'SUBREDDITS')):
    processedSubreddit = processASubReddit(subreddit,params)
    if (processedSubreddit[1] is not None):
        logging.info("Didn't store anything to db. Something went wrong")
    else:
        databaseDriver.addToDatabase(sql,*processedSubreddit[0])
    time.sleep(int(config.get('SLEEPTIME', 'SR_SLEEP'))) 

# 5. Set parameters.
# params["content"] = ', '.join(comments[0])[:49950] # rate limit of 50,000
# params["content"] = 'test ankit gyawali 1234 @#!@# --- ... AAAA  grammar. He loved football. He was playing football. He had won five matches until that day. He had been playing football for ten years. He loves football. He is playing football. He has won five matches so far. He has been playing football for ten years. He will love football. He will be playing football. He will have won five matches by then. He will have been playing football for ten years.'
# params["content"] =  '  MOSCOW (Reuters) - Russian state news organization Rossiya Segodnya said on Friday it objected to a Reuters article it said had falsely claimed that Kremlin-backed media had tried to influence the 2016 U.S. election.  A Reuters spokesperson said the news agency stood by the story which reported exclusively on April 19 that a Russian government think tank controlled by Vladimir Putin had developed a plan to swing the election in favor of Donald Trump by getting several state-backed media outlets to produce positive reports on Trump.  Three current and four former U.S. officials said Kremlin-backed TV channel RT and the Sputnik news agency were among state-backed news outlets which the Kremlin had instructed to weigh in on Trumps side and to try to undermine voters’ faith in the American electoral system.  Margarita Simonyan, editor-in-chief of Rossiya Segodnya and RT criticized the Reuters story on social media on Friday. She linked to an article by the RIA news agency, which along with Sputnik, is owned by Rossiya Segodnya. '



# logging.info("SENTIMENT ANKIT")
# logging.info(api.sentiment(params))
# logging.info("CATAGORIES ANKIT")



#   5 subreddits times 10 posts times 31 days times  6/day (every 4 hour)  -> API KEY 1
