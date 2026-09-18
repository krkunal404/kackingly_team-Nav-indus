import os
import json
from dotenv import load_dotenv
load_dotenv()
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

prompt = "Hello, output a json object {\"test\": 1}"
try:
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=[prompt]
    )
    print("SUCCESS")
    print(response.text)
except Exception as e:
    print("ERROR:", e)
