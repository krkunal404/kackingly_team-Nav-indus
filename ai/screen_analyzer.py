import json
import os
import PIL.Image
from google import genai
from pydantic import ValidationError
from typing import Dict, Any, Optional, List

from knowledge.models import Screen

class ScreenAnalyzer:
    def __init__(self):
        # Initialize the new Google GenAI client
        api_key = os.environ.get("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-3.1-pro-preview"
        
    def analyze_screen(self, screen_id: str, ui_tree: Dict[str, Any], image_path: Optional[str] = None, exploration_history: Optional[List[Dict[str, Any]]] = None) -> Screen:
        """
        Sends the UI tree, screenshot, and history to the LLM to extract structured data and next action.
        Returns a parsed Screen object.
        """
        history_str = json.dumps(exploration_history, indent=2) if exploration_history else "[]"
        
        prompt = f"""
You are an expert Android AI agent exploring an app autonomously.
Your goal is to analyze the current screen and decide the next action to take to explore the app further.

I am providing you with the accessibility UI tree (in XML format) for the screen, and optionally the screenshot image.

Here is the history of screens visited and actions taken so far. DO NOT repeat actions you have already taken on the same screen, unless you need to go back or recover from an error. Try to explore new features and screens.
HISTORY:
{history_str}

I need you to output a JSON object describing this screen, matching this exact JSON schema:

{{
  "screen_id": "{screen_id}",
  "screenshot": "{os.path.basename(image_path) if image_path else ""}",
  "elements": [
    {{
      "id": "A unique identifier for the element, matching resource-id if available or a descriptive name",
      "type": "button, text, input, image, etc.",
      "label": "The visible text or content description",
      "description": "What this element does",
      "interactive": true or false
    }}
  ],
  "actions_taken": [],
  "next_action": {{
    "element_id": "Must match an id from the elements array. Use 'back' if you want to go back.",
    "type": "tap, input, scroll, back",
    "intent": "Why you are doing this action"
  }}
}}

Analyze this UI tree carefully. Only output valid JSON.
Do not wrap it in markdown block quotes (```json ... ```). Output the raw JSON text directly.

UI TREE:
{json.dumps(ui_tree, indent=2)[:8000]}
"""
        
        contents = [prompt]
        if image_path and os.path.exists(image_path):
            try:
                img = PIL.Image.open(image_path)
                contents.append(img)
            except Exception as e:
                print(f"Failed to load image: {e}")

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=contents,
            )
            
            # Parse response as JSON
            response_text = response.text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:-3].strip()
            elif response_text.startswith("```"):
                response_text = response_text[3:-3].strip()
                
            data = json.loads(response_text)
            
            # Enforce screen_id from parameter
            data["screen_id"] = screen_id
            
            return Screen(**data)
            
        except Exception as e:
            print(f"Error during AI analysis: {e}")
            # Fallback behavior
            return Screen(
                screen_id=screen_id,
                name="Unknown Screen",
                purpose="Failed to analyze"
            )
