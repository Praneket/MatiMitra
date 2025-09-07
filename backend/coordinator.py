import sys
import os
import json
import hashlib

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from tools.redis_client import get_cached_response, set_cached_response

from backend.agents.decomposer import decompose_problem
from backend.agents.crop_agent import solve_crop_issue
from backend.agents.soil_agent import solve_soil_issue
from backend.agents.weather_agent import solve_weather_issue
from backend.agents.market_agent import solve_market_issue
from backend.agents.evaluator import evaluate_solutions

def hash_query(query: str) -> str:
    return hashlib.sha256(query.encode()).hexdigest()

def process_query(query: str) -> dict:
    print("Received query:", query)

    # 🔁 Redis Caching
    cache_key = f"query:{hash_query(query)}"
    cached = get_cached_response(cache_key)
    if cached:
        print("🧠 Served from Redis Cache.")
        return json.loads(cached)

    # Step 1: Decompose
    sub_tasks_text = decompose_problem(query)
    parts = sub_tasks_text.lower().split('\n')

    # Step 2: Route to agents
    solutions = []
    for part in parts:
        if "crop" in part or "disease" in part or "leaves" in part:
            solutions.append(solve_crop_issue(part))
        elif "soil" in part or "nutrient" in part or "ph" in part:
            solutions.append(solve_soil_issue(part))
        elif "weather" in part or "climate" in part or "rain" in part:
            solutions.append(solve_weather_issue(part))
        elif "cost" in part or "price" in part or "market" in part:
            solutions.append(solve_market_issue(part))
        else:
            solutions.append({
                "agent": "Unknown Agent",
                "response": f"Could not determine agent for: {part}",
                "confidence": 0.5
            })

    # Step 3: Evaluate
    evaluation = evaluate_solutions(solutions)
    result = {
        "result": f"""✅ Best Suggestion:
{evaluation['best']['response']}

📊 Summary of all agents:
{evaluation['summary']}
"""
    }

    # ✅ Cache result
    set_cached_response(cache_key, json.dumps(result), ttl=3600)

    return result
