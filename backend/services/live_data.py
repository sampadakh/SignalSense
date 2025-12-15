import feedparser
import requests
from bs4 import BeautifulSoup
import random
import urllib.parse

def get_live_news(query="Technology"):
    """
    Fetches real-time news from Google News RSS.
    """
    try:
        encoded_query = urllib.parse.quote(query)
        rss_url = f"https://news.google.com/rss/search?q={encoded_query}&hl=en-US&gl=US&ceid=US:en"
        
        feed = feedparser.parse(rss_url)
        
        trends = []
        for entry in feed.entries[:7]:  # Limit to 7 items
            # Determine sentiment randomly for demo (Real sentiment analysis would require NLP model)
            sentiment_score = random.choice(["Positive", "Very Positive", "Neutral", "Mixed", "Critical"])
            growth_score = random.randint(10, 95)
            
            trends.append({
                "id": entry.id,
                "name": entry.title,
                "link": entry.link,
                "growth": growth_score,
                "sentiment": sentiment_score,
                "type": "Live News",
                "published": entry.published
            })
            
        return trends
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def get_patent_activity(query):
    """
    Scrapes Google Patents for recent activity count (Demo approximation).
    """
    # NOTE: Actual scraping of Google Patents is blocked by CAPTCHA easily. 
    # This is a simulation based on the query to demonstrate the data pipeline 
    # without getting the IP banned during a demo.
    
    # In a real production env, we would use:
    # url = f"https://patents.google.com/?q={query}&sort=new"
    # But for this user-facing demo, we will simulate realistic results based on the query topic.
    
    base_score = len(query) * 2
    return {
        "new_filings": random.randint(base_score, base_score + 50),
        "major_assignees": ["Google LLC", "IBM", "Samsung Electronics", "Microsoft"],
        "top_classification": "G06N (Computing Arrangements Based on Specific Computational Models)"
    }
