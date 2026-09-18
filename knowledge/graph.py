from typing import List, Dict, Optional
from knowledge.models import Screen, Action, AppKnowledgeGraph, GraphNode, GraphEdge

class GraphManager:
    def __init__(self):
        self.screens: Dict[str, Screen] = {}
        self.edges: List[GraphEdge] = []
        
    def add_screen(self, screen: Screen):
        if screen.screen_id not in self.screens:
            self.screens[screen.screen_id] = screen
            
    def add_transition(self, from_screen_id: str, action: str, to_screen_id: str):
        # Avoid duplicate edges
        for edge in self.edges:
            if edge.from_node == from_screen_id and edge.action == action and edge.to_node == to_screen_id:
                return
        
        self.edges.append(GraphEdge(
            from_node=from_screen_id,
            action=action,
            to_node=to_screen_id
        ))
        
    def build_app_knowledge_graph(self) -> AppKnowledgeGraph:
        nodes = []
        for screen_id, screen in self.screens.items():
            nodes.append(GraphNode(id=screen_id, name=screen.name))
            
        return AppKnowledgeGraph(nodes=nodes, edges=self.edges)
        
    def get_all_screens(self) -> List[Screen]:
        return list(self.screens.values())
        
    def get_screen(self, screen_id: str) -> Optional[Screen]:
        return self.screens.get(screen_id)
