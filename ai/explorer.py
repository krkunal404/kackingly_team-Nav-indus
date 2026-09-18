import os
import asyncio
import time
import uiautomator2 as u2
from typing import AsyncGenerator

from ai.screen_analyzer import ScreenAnalyzer
from knowledge.graph import GraphManager

class AutonomousExplorer:
    def __init__(self, target_pkg: str = None, max_steps: int = 10):
        self.target_pkg = target_pkg
        self.max_steps = max_steps
        self.analyzer = ScreenAnalyzer()
        self.graph = GraphManager()
        self.history = []
        os.makedirs("screenshots", exist_ok=True)

    async def run(self) -> AsyncGenerator[str, None]:
        yield "data: {\"status\": \"Connecting to device...\"}\n\n"
        try:
            d = u2.connect()
            yield f"data: {{\"status\": \"✓ Connected to device: {d.device_info.get('serial', 'unknown')}\"}}\n\n"
        except Exception as e:
            yield f"data: {{\"status\": \"❌ Failed to connect to device: {str(e)}\"}}\n\n"
            return
            
        if self.target_pkg:
            yield f"data: {{\"status\": \"Launching {self.target_pkg}...\"}}\n\n"
            d.app_start(self.target_pkg, use_monkey=True)
            await asyncio.sleep(3)

        current_screen_id = None

        for step in range(self.max_steps):
            yield f"data: {{\"status\": \"Step {step+1}/{self.max_steps}: Analyzing screen...\"}}\n\n"
            
            # Wait for idle
            d.wait_timeout = 5.0
            
            # Dump UI XML
            ui_tree_str = d.dump_hierarchy(compressed=True)
            
            screen_id = f"screen_{int(time.time())}"
            image_path = f"screenshots/{screen_id}.png"
            d.screenshot(image_path)
            
            # Analyze
            screen = self.analyzer.analyze_screen(
                screen_id=screen_id,
                ui_tree={"xml": ui_tree_str}, # Wrapped in dict since signature expects Dict
                image_path=image_path,
                exploration_history=self.history
            )
            
            self.graph.add_screen(screen)
            yield f"data: {{\"status\": \"✓ Analyzed screen: {screen.name or screen_id}\"}}\n\n"
            
            if current_screen_id:
                # Add edge from previous screen
                last_action = self.history[-1] if self.history else None
                if last_action:
                    self.graph.add_transition(current_screen_id, f"{last_action['type']} {last_action.get('element_id', '')}", screen.screen_id)
            
            current_screen_id = screen.screen_id
            
            # Execute next action
            next_action = screen.next_action
            if not next_action:
                yield "data: {\"status\": \"No next action determined. Exploration finished.\"}\n\n"
                break
                
            yield f"data: {{\"status\": \"Executing: {next_action.type} on {next_action.element_id}\"}}\n\n"
            
            action_record = {
                "screen_id": screen.screen_id,
                "type": next_action.type,
                "element_id": next_action.element_id,
                "intent": next_action.intent
            }
            self.history.append(action_record)
            
            # Perform action on device
            try:
                if next_action.type == "back":
                    d.press("back")
                elif next_action.type == "tap":
                    if next_action.element_id:
                        # Try to click by resourceId, text, or description
                        el = d(resourceId=next_action.element_id)
                        if el.exists:
                            el.click()
                        else:
                            el = d(text=next_action.element_id)
                            if el.exists:
                                el.click()
                            else:
                                el = d(description=next_action.element_id)
                                if el.exists:
                                    el.click()
                                else:
                                    yield f"data: {{\"status\": \"⚠️ Element {next_action.element_id} not found\"}}\n\n"
                    else:
                        d.click(d.info['displaySizeDpX'] // 2, d.info['displaySizeDpY'] // 2)
                elif next_action.type == "input":
                    el = d(resourceId=next_action.element_id)
                    if el.exists:
                        el.set_text("Test input")
                elif next_action.type == "scroll":
                    d(scrollable=True).scroll.forward()
            except Exception as e:
                yield f"data: {{\"status\": \"⚠️ Action failed: {str(e)}\"}}\n\n"
                
            await asyncio.sleep(2) # Wait for animation/load
            
        yield "data: {\"status\": \"Generating final Knowledge Pack...\"}\n\n"
        
        from ai.knowledge_generator import KnowledgeGenerator
        generator = KnowledgeGenerator()
        pack = generator.generate_pack(self.graph, self.target_pkg or "UnknownApp", "1.0")
        
        with open("app_knowledge.json", "w") as f:
            f.write(pack.model_dump_json(indent=2))
            
        yield f"data: {{\"status\": \"Exploration complete. {len(self.graph.screens)} screens found.\", \"done\": true}}\n\n"
