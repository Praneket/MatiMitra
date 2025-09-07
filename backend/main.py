from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from backend.agents.decomposer import decompose_problem

app = FastAPI()

# Enable CORS (allow frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "RootSense AI backend is running ✅"}

@app.post("/ask")
async def ask_query(request: Request):
    try:
        data = await request.json()
        query = data.get("query")

        if not query:
            print("❌ Received query: None")
            return {"error": "Missing 'query' in request body"}

        print("✅ Received query:", query)

        result = await decompose_problem(query)

        print("✅ AI Response:", result)
        return {"response": result}

    except Exception as e:
        print("❌ Error in /ask:", e)
        return {"error": str(e)}
