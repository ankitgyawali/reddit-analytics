# reddit-analytics
reddit-analytics analyzes popular posts from selected subreddits every 8 hours to product interesting visualizations. Currently visualizations are limited to past 7 days.

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
Category Pie Chart

### Category Pie Chart 
- Categorize associated reddit post and represent them as a piechart. Clicking on each pie's will display list of associated reddit posts.

### Sentiment Timeline
- Amount of positive/neutral/negative posts for any subreddit over a period of week.

### Entity Dispersion
- Shows dominance of any particular topic in a subreddit.

### Sunburst Chart
- Categorize metadata of each subreddit into various buckets to see if they show any distinguishable pattern. 

## Docs
![Basic Flow](docs/basic-flow.jpb?raw=true "Basic Flow")