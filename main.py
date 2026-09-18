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
    Simulates the autonomous explorer and yields SSE status updates.
    """
    async def event_stream():
        global app_knowledge_pack
        
        yield "data: {\"status\": \"Starting autonomous exploration...\"}\n\n"
        await asyncio.sleep(1)
        
        yield "data: {\"status\": \"✓ Application launched\"}\n\n"
        
        analyzer = ScreenAnalyzer()
        graph = GraphManager()
        
        # 1. Login
        login_id = generate_fingerprint(LOGIN_UI)
        yield f"data: {{\"status\": \"✓ Login screen detected (ID: {login_id})\"}}\n\n"
        login_screen = analyzer.analyze_screen(login_id, LOGIN_UI)
        graph.add_screen(login_screen)
        await asyncio.sleep(1)
        
        yield "data: {\"status\": \"✓ Login completed (Simulating action)\"}\n\n"
        
        # 2. Home
        home_id = generate_fingerprint(HOME_UI)
        yield f"data: {{\"status\": \"✓ Home discovered (ID: {home_id})\"}}\n\n"
        home_screen = analyzer.analyze_screen(home_id, HOME_UI)
        graph.add_screen(home_screen)
        
        # Add Edge
        graph.add_transition(login_id, "tap login_btn", home_id)
        await asyncio.sleep(1)
        
        # 3. Settings
        settings_id = generate_fingerprint(SETTINGS_UI)
        yield f"data: {{\"status\": \"✓ Settings discovered (ID: {settings_id})\"}}\n\n"
        settings_screen = analyzer.analyze_screen(settings_id, SETTINGS_UI)
        graph.add_screen(settings_screen)
        
        graph.add_transition(home_id, "tap nav_settings", settings_id)
        graph.add_transition(settings_id, "tap btn_back", home_id)
        await asyncio.sleep(1)

        # 4. Products
        products_id = generate_fingerprint(PRODUCTS_UI)
        yield f"data: {{\"status\": \"✓ Products discovered (ID: {products_id})\"}}\n\n"
        products_screen = analyzer.analyze_screen(products_id, PRODUCTS_UI)
        graph.add_screen(products_screen)
        
        graph.add_transition(home_id, "tap nav_products", products_id)
        graph.add_transition(products_id, "tap btn_back", home_id)
        await asyncio.sleep(1)
        
        # Generate Knowledge Pack
        yield "data: {\"status\": \"Generating Knowledge Pack...\"}\n\n"
        generator = KnowledgeGenerator()
        app_knowledge_pack = generator.generate_pack(graph, "DemoShop", "1.0")
        
        # Save to disk
        with open("app_knowledge.json", "w") as f:
            f.write(app_knowledge_pack.model_dump_json(indent=2))
            
        yield f"data: {{\"status\": \"Exploration complete. {len(graph.screens)} screens, {sum(len(s.elements) for s in graph.screens.values())} elements.\", \"done\": true}}\n\n"

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
