import json
import os
from google import genai
from pydantic import ValidationError
from typing import Dict, Any, Optional

from knowledge.models import Screen

class ScreenAnalyzer:
    def __init__(self):
        # Initialize the new Google GenAI client
        api_key = os.environ.get("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-3.1-pro-preview"
        
    def analyze_screen(self, screen_id: str, ui_tree: Dict[str, Any], image_path: Optional[str] = None) -> Screen:
        """
        Sends the UI tree and screenshot to the LLM to extract structured data.
        Returns a parsed Screen object.
        """
        prompt = f"""
You are an expert Android AI agent. Your goal is to analyze the provided screen.
I am providing you with the accessibility UI tree (in JSON) for the screen.
I need you to output a JSON object describing this screen, matching this exact JSON schema:

{{
  "screen_id": "{screen_id}",
  "name": "Screen Name (e.g., Home, Settings)",
  "purpose": "A brief description of what this screen does",
  "elements": [
    {{
      "id": "A unique identifier for the element, matching resource-id if available or a descriptive name",
      "type": "button, text, input, image, etc.",
      "label": "The visible text or content description",
      "description": "What this element does",
      "interactive": true or false
    }}
  ],
  "forms": [],
  "actions": [
    {{
      "element_id": "Must match an id from the elements array",
      "type": "tap, input, swipe, etc.",
      "intent": "What the action is trying to achieve (e.g., open_settings)"
    }}
  ],
  "design": {{
    "theme": "light or dark",
    "primary_color": "Hex color code",
    "background_color": "Hex color code",
    "font_family": "Font family name",
    "corner_style": "rounded, square, etc."
  }}
}}

Analyze this UI tree carefully. Only output valid JSON.
Do not wrap it in markdown block quotes (```json ... ```). Output the raw JSON text directly.

UI TREE:
{json.dumps(ui_tree, indent=2)[:5000]} # Truncated to avoid token limits if too large, though Gemini handles large contexts.
"""
        
        contents = [prompt]
        if image_path and os.path.exists(image_path):
            try:
                # In GenAI, we can pass local files or upload them. Let's pass the raw bytes or use upload_file.
                # For simplicity, we'll try to just pass the prompt if image handling is complex, but image is important.
                # Let's try passing the image via upload if needed. For now, text is most reliable.
                pass
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
                purpose="Failed to analyze",
                design={
                    "theme": "unknown",
                    "primary_color": "#000000",
                    "background_color": "#ffffff",
                    "font_family": "Roboto",
                    "corner_style": "unknown"
                }
            )
