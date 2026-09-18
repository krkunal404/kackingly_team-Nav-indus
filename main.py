import json
import asyncio
import os
from dotenv import load_dotenv

# Load environment variables from .env file before other imports that might need it
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from knowledge.fingerprint import generate_fingerprint
from knowledge.graph import GraphManager
from ai.screen_analyzer import ScreenAnalyzer
from ai.knowledge_generator import KnowledgeGenerator
from ai.query_agent import QueryAgent
from mock_data import LOGIN_UI, HOME_UI, SETTINGS_UI, PRODUCTS_UI
from knowledge.models import KnowledgePack
from ai.explorer import AutonomousExplorer

app = FastAPI()

# Allow CORS for the dashboard frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global state to hold the Knowledge Pack after scanning
app_knowledge_pack: KnowledgePack = None

class QueryRequest(BaseModel):
    question: str

@app.get("/api/scan")
async def scan_app():
    """
    Runs the autonomous explorer and yields SSE status updates.
    """
    explorer = AutonomousExplorer(max_steps=5) # Default config for demo
    
    async def event_stream():
        global app_knowledge_pack
        async for event in explorer.run():
            yield event
            
        # After exploration completes, load the generated pack to memory if needed
        if os.path.exists("app_knowledge.json"):
            with open("app_knowledge.json", "r") as f:
                app_knowledge_pack = KnowledgePack(**json.loads(f.read()))

    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.get("/api/knowledge")
def get_knowledge():
    """
    Returns the generated Knowledge Pack.
    """
    global app_knowledge_pack
    if not app_knowledge_pack:
        if os.path.exists("app_knowledge.json"):
            with open("app_knowledge.json", "r") as f:
                return json.loads(f.read())
        raise HTTPException(status_code=404, detail="Knowledge pack not generated yet")
    return json.loads(app_knowledge_pack.model_dump_json())

@app.post("/api/query")
def query_agent(req: QueryRequest):
    """
    Asks the AI Agent a question using the Knowledge Pack.
    """
    global app_knowledge_pack
    if not app_knowledge_pack:
        if os.path.exists("app_knowledge.json"):
            with open("app_knowledge.json", "r") as f:
                data = json.loads(f.read())
                app_knowledge_pack = KnowledgePack(**data)
        else:
            raise HTTPException(status_code=400, detail="Please run scan first.")
            
    agent = QueryAgent()
    answer = agent.query(req.question, app_knowledge_pack)
    return {"answer": answer}
