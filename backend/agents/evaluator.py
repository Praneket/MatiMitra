def evaluate_solutions(solutions):
    best = max(solutions, key=lambda x: x["confidence"])
    summary = "\n".join(
        [f"{sol['agent']} → {sol['response']} (score: {sol['confidence']})" for sol in solutions]
    )
    return {"best": best, "summary": summary}
