async def solve_weather_issue(query: str):
    return {
        "agent": "WeatherAgent",
        "response": "Check weather forecast. Delay spraying if rain expected.",
        "confidence": 0.8
    }
