import json
import os
from google import genai
from knowledge.models import KnowledgePack

class QueryAgent:
    def __init__(self):
        api_key = os.environ.get("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key)
        
    def query(self, question: str, pack: KnowledgePack) -> str:
        """
        Uses the LLM to answer a user's question based ONLY on the provided App Knowledge Pack.
        """
        pack_json = pack.model_dump_json(indent=2)
        
        prompt = f"""
You are an expert app navigation assistant named AppMind.
Your task is to answer the user's question about how to use an app, based STRICTLY on the provided App Knowledge Pack.

App Knowledge Pack (JSON):
{pack_json}

User Question:
{question}

Answer with a clear, step-by-step navigation path if applicable. Keep it concise.
Example: "Open Home → Settings → Notifications."
If the answer is not in the Knowledge Pack, say "I'm sorry, I haven't discovered that part of the app yet."
"""
        try:
            response = self.client.models.generate_content(
                model="gemini-3.1-pro-preview",
                contents=[prompt],
            )
            return response.text.strip()
        except Exception as e:
            print(f"Error querying agent: {e}")
            return "Sorry, I am unable to process your request at the moment."
