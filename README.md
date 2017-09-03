# reddit-analytics
reddit-analytics analyzes popular posts from selected subreddits every 8 hours to product interesting data visualizations. Currently visualizations are limited to past 7 days.

Technologies used for this project are: 
- Angular JS
- D3 js
- Node JS/Express JS for API & Query caching
- Python Cron Script for Reddit Scraping
- Rosette API for post to metadata conversion
- Sqlite db for storage. 

## Usage

### Entity Word Cloud

- Create word cloud from most commonly used "entities". The color of text represents it's sentiment. Clicking on the word shows associated metadata and main reddit post.

### Category Pie Chart 
- Categorize associated reddit post and represent them as a piechart. Clicking on each pie will display list of associated reddit posts.

### Sentiment Timeline
- Amount of positive/neutral/negative posts for any subreddit over a period of week.

### Entity Dispersion
- Shows dominance of any particular topic in a subreddit.

### Sunburst Chart
- Categorize metadata of each subreddit into various buckets to see if they show any distinguishable pattern. 



Feel free to contact me if you would like the whole database with converted metadata. (mail@ankitgyawali.com)

Possible expansion for this project could include: Viewing metadata by date, custom subreddit analysis option so it could be used by mods of various subreddits etc.

## Running locally as dev mode
Basic steps to run:
- Clone the repository. Ensure you have python & node js installed on your system.
- Copy `sample-config.ini` to `config.ini` inside server folder & configure with rosette api key & reddit script secret.
- Install server requirements by running `pip install -r requirements.txt` from server folder.
- Install node dependencies by running `npm install` from both `server` & `client` folder.
- Iniitialize database by running `init.py` on server folder, `python init.py`
- Run server, by running `node server.js` or `npm run start` from server folder. Visualizations should for the day should now be accessible on `localhost:3002`.

## Docs
![Basic Flow](docs/basic-flow.jpg?raw=true "Basic Flow")


## Issues
Report all issues related to reddit-analytics on this separate <a href="https://github.com/ankitgyawali/reddit-analytics/issues" target="_blank">issue page</a>.

## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
