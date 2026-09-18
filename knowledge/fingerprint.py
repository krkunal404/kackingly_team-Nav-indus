import hashlib
import json
from typing import Dict, Any

def generate_fingerprint(ui_tree: Dict[str, Any]) -> str:
    """
    Generates a consistent SHA-256 hash for a screen based on its normalized UI tree.
    Extracts text, element types, clickability, editable state, resource IDs,
    and a normalized hierarchy, ignoring coordinates and timestamps.
    """
    # Create a normalized representation of the tree
    normalized_data = _normalize_node(ui_tree)
    
    # Convert to JSON string with sorted keys to ensure consistent hashing
    json_string = json.dumps(normalized_data, sort_keys=True)
    
    # Hash it
    hash_obj = hashlib.sha256(json_string.encode('utf-8'))
    
    # Return first 8 chars for a short ID
    return f"screen_{hash_obj.hexdigest()[:8]}"

def _normalize_node(node: Dict[str, Any]) -> Dict[str, Any]:
    """Recursively extracts only the fields needed for fingerprinting."""
    normalized = {}
    
    # Keep essential fields that define the screen state
    if "class" in node:
        normalized["class"] = node["class"]
    if "text" in node:
        normalized["text"] = node["text"]
    if "content-desc" in node:
        normalized["content-desc"] = node["content-desc"]
    if "resource-id" in node:
        normalized["resource-id"] = node["resource-id"]
    if "clickable" in node:
        normalized["clickable"] = node["clickable"]
    if "editable" in node:
        normalized["editable"] = node["editable"]
        
    # Recursively normalize children
    if "children" in node and isinstance(node["children"], list):
        normalized["children"] = [_normalize_node(child) for child in node["children"]]
        
    return normalized
