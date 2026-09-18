from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class Element(BaseModel):
    id: str
    type: str
    label: Optional[str] = None
    description: Optional[str] = None
    interactive: bool = False

class Action(BaseModel):
    element_id: str
    type: str
    intent: str

class Design(BaseModel):
    theme: str
    primary_color: str
    background_color: str
    font_family: str
    corner_style: str

class Screen(BaseModel):
    screen_id: str
    name: Optional[str] = None
    purpose: Optional[str] = None
    screenshot: Optional[str] = None
    elements: List[Element] = Field(default_factory=list)
    forms: List[Dict[str, Any]] = Field(default_factory=list)
    actions: List[Action] = Field(default_factory=list)
    actions_taken: List[str] = Field(default_factory=list)
    next_action: Optional[Action] = None
    design: Optional[Design] = None

class GraphNode(BaseModel):
    id: str
    name: str

class GraphEdge(BaseModel):
    from_node: str = Field(alias="from")
    action: str
    to_node: str = Field(alias="to")
    
    class Config:
        populate_by_name = True

class AppKnowledgeGraph(BaseModel):
    nodes: List[GraphNode] = Field(default_factory=list)
    edges: List[GraphEdge] = Field(default_factory=list)

class AppMetadata(BaseModel):
    name: str
    version: str

class ScanMetadata(BaseModel):
    screens_discovered: int = 0
    elements_discovered: int = 0

class Journey(BaseModel):
    name: str
    steps: List[str]

class KnowledgePack(BaseModel):
    app: AppMetadata
    screens: List[Screen] = Field(default_factory=list)
    journeys: List[Journey] = Field(default_factory=list)
    design_system: Optional[Design] = None
    navigation_graph: AppKnowledgeGraph
    scan_metadata: ScanMetadata
