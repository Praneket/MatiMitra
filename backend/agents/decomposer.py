# backend/agents/decomposer.py

from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="phi", temperature=0.3, max_tokens=120)  # 🔥 tight response

async def decompose_problem(prompt: str) -> str:
    try:
        print("🌱 Prompt sent to Ollama:\n", prompt)
        result = await llm.ainvoke(prompt)
        print("🌾 Result received:\n", result)
        return result
    except Exception as e:
        print("❌ Error in decompose_problem:", e)
        return "⚠️ Error generating farming recommendation"
