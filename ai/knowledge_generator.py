from knowledge.models import KnowledgePack, AppMetadata, ScanMetadata, AppKnowledgeGraph
from knowledge.graph import GraphManager
from typing import List, Dict

class KnowledgeGenerator:
    def generate_pack(self, graph_manager: GraphManager, app_name: str, app_version: str) -> KnowledgePack:
        """
        Compiles all tracked screens and edges into the final KnowledgePack.
        """
        all_screens = graph_manager.get_all_screens()
        
        # Simple automatic journey generation based on DFS/BFS paths could be added here
        # For prototype, we'll just extract a basic 3-step journey if available
        journeys = []
        if len(all_screens) >= 3 and len(graph_manager.edges) >= 2:
            journeys.append({
                "name": "Main Navigation Flow",
                "steps": [s.screen_id for s in all_screens[:3]]
            })

        design_system = all_screens[0].design if all_screens else None

        elements_discovered = sum(len(s.elements) for s in all_screens)

        pack = KnowledgePack(
            app=AppMetadata(name=app_name, version=app_version),
            screens=all_screens,
            journeys=journeys,
            design_system=design_system,
            navigation_graph=graph_manager.build_app_knowledge_graph(),
            scan_metadata=ScanMetadata(
                screens_discovered=len(all_screens),
                elements_discovered=elements_discovered
            )
        )
        return pack
