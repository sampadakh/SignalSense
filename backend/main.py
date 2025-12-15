from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import random
from datetime import datetime, timedelta
import os
from services.live_data import get_live_news, get_patent_activity
from services.report_generator import generate_market_report

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "system": "SignalSense AI"}

@app.get("/api/trends")
def get_trends(q: str = None):
    # Live News Data (simulated merge with mock structural data for the radar chart)
    news_trends = []
    try:
        if q:
             news_trends = get_live_news(q)
        else:
             news_trends = get_live_news("Technology")
    except:
        pass # Fallback to empty if offline
    
    # Base Mock Data for Radar Chart (Needs structured growth metrics often not in RSS)
    trends = [
        {"id": 1, "name": "AI in Manufacturing", "growth": 32, "sentiment": "Positive", "type": "Micro-trend"},
        {"id": 2, "name": "Sustainable Packaging", "growth": 18, "sentiment": "Neutral", "type": "Industry Shift"},
        {"id": 3, "name": "Hyper-personalization", "growth": 45, "sentiment": "Very Positive", "type": "Consumer Behavior"},
        {"id": 4, "name": "Quantum Computing SaaS", "growth": 12, "sentiment": "Mixed", "type": "Emerging Tech"},
        {"id": 5, "name": "Voice Commerce", "growth": 22, "sentiment": "Positive", "type": "Adoption"},
        {"id": 6, "name": "AI Security", "growth": 67, "sentiment": "Critical", "type": "Micro-trend"},
        {"id": 7, "name": "Generative Video", "growth": 89, "sentiment": "Explosive", "type": "Consumer Tech"}
    ]
    
    # Filter base trends if query exists
    if q:
        q_lower = q.lower()
        trends = [t for t in trends if q_lower in t["name"].lower() or q_lower in t["type"].lower()]
        
    return {
        "trends": trends, 
        "news": news_trends, 
        "meta": {"total_analyzed": 1540 + len(trends) + len(news_trends), "source": "Global News & Social"}
    }

@app.get("/api/report")
def get_report(topic: str = "Market Overview"):
    try:
        # Generate PDF
        # In a real app, we would fetch fresh data here. For now we pass some context.
        trends_data = get_live_news(topic)[:5]
        report_data = {
            "topic": topic,
            "trends": trends_data
        }
        
        filename = generate_market_report(report_data)
        file_path = os.path.abspath(filename)
        
        if not os.path.exists(file_path):
             return {"error": "Report generation failed: File not found"}

        return FileResponse(
            path=file_path, 
            filename=filename, 
            media_type='application/pdf'
        )
    except Exception as e:
        print(f"REPORT ERROR: {e}")
        return {"error": str(e)}

@app.get("/api/intelligence")
def get_intelligence():
    # Mock Competitor Intel
    return {
        "competitors": [
            {"name": "Competitor A", "action": "Price Drop", "risk": "High", "impact": "High"},
            {"name": "Competitor B", "action": "New Feature Launch", "risk": "Medium", "impact": "Medium"},
            {"name": "Competitor C", "action": "Ad Campaign", "risk": "Low", "impact": "Low"}
        ],
        "alerts": [
            "Competitor A lowered pricing by 15% in APAC region.",
            "Competitor B is hiring AI engineers aggressively."
        ]
    }

@app.get("/api/forecasts")
def get_forecasts():
    # Mock Forecast Data
    return {
        "revenue_forecast": [
            {"month": "Jan", "value": 100},
            {"month": "Feb", "value": 120},
            {"month": "Mar", "value": 115},
            {"month": "Apr", "value": 140},
            {"month": "May", "value": 165},
            {"month": "Jun", "value": 190}
        ],
        "market_growth": 14.5,
        "confidence_score": 0.88
    }

@app.get("/api/strategies")
def get_strategies():
    # Mock AI Recommendations
    return {
        "recommendations": [
            {"title": "Target Manufacturing AI Niche", "description": "High growth (32%) and low competition density make this a prime entry point.", "roi_score": 9.2},
            {"title": "Adjust Pricing Tier", "description": "Competitor A's price drop suggests a need for a 'Lite' tier to protect market share.", "roi_score": 8.5},
            {"title": "Invest in Voice Search Optimization", "description": "Rising trend in voice commerce suggests early adoption advantage.", "roi_score": 7.8}
        ]
    }
