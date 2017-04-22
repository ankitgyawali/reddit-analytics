# Initialize reddit to get comments, process those comments via rosette api and parse them for sending db friendly data to database-driver.py
import praw
import time
import re
import requests
import json
import sqlite3
import logging
import configparser
import initDataPocessor

from rosette.api import API, DocumentParameters, MorphologyOutput

import rosette.api

config = configparser.ConfigParser()
config.readfp(open(r'config.ini'))

# Bot Configs
SLEEPTIME = int(config.get('SLEEPTIME', 'TIME'))


logging.basicConfig(
    format = '[%(asctime)s] %(levelname)s: %(name)s: %(message)s',
    filename = config.get('LOGGING', 'LOG_FILENAME'),
level=logging.INFO)

logging.info('Starting timestamp reddit bot.')
reddit = praw.Reddit(client_id=config.get('PRAW_DETAILS', 'CLIENT_ID'),
                     client_secret=config.get('PRAW_DETAILS', 'CLIENT_SECRET'),
                     password=config.get('PRAW_DETAILS', 'BOT_PASSWORD'),
                     user_agent=config.get('PRAW_DETAILS', 'USERAGENT'),
                     username=config.get('PRAW_DETAILS', 'BOT_USERNAME'))


api = API("e4897f0ec498c64935cf0b022fc3eef4")

def processABatch(batchSubmissions):
    singleComment = []
    for submission in batchSubmissions:
        submissioncomments = []
        submission.comments.replace_more(limit=0)
        comment_queue = submission.comments[:]  # Seed with top-level
        while comment_queue:
            comment = comment_queue.pop(0)
            submissioncomments.append(comment.body)
            comment_queue.extend(comment.replies)
        singleComment.append(submissioncomments)
    return singleComment

comments = processABatch(reddit.subreddit("all").top(limit=1))
print(len(comments))



params = DocumentParameters()

# 5. Set parameters.
# params["content"] = ', '.join(comments[0])
# params["content"] = 'test ankit gyawali 1234 @#!@# --- ... AAAA  grammar. He loved football. He was playing football. He had won five matches until that day. He had been playing football for ten years. He loves football. He is playing football. He has won five matches so far. He has been playing football for ten years. He will love football. He will be playing football. He will have won five matches by then. He will have been playing football for ten years.'
params["content"] =  '  MOSCOW (Reuters) - Russian state news organization Rossiya Segodnya said on Friday it objected to a Reuters article it said had falsely claimed that Kremlin-backed media had tried to influence the 2016 U.S. election.  A Reuters spokesperson said the news agency stood by the story which reported exclusively on April 19 that a Russian government think tank controlled by Vladimir Putin had developed a plan to swing the election in favor of Donald Trump by getting several state-backed media outlets to produce positive reports on Trump.  Three current and four former U.S. officials said Kremlin-backed TV channel RT and the Sputnik news agency were among state-backed news outlets which the Kremlin had instructed to weigh in on Trumps side and to try to undermine voters’ faith in the American electoral system.  Margarita Simonyan, editor-in-chief of Rossiya Segodnya and RT criticized the Reuters story on social media on Friday. She linked to an article by the RIA news agency, which along with Sputnik, is owned by Rossiya Segodnya. '

# 6. Make a call.
result = api.morphology(params)

# result is a Python dictionary that contains
# logging.info((comments[0]))
logging.info(len(comments[0]))
logging.info(result)

logging.info(initDataPocessor.entitiyNormalizer("TEST"))

