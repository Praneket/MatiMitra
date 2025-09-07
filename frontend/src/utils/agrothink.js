export async function getAgroRecommendation(sensorData) {
  const prompt = `
You're an agricultural AI. Based on the following soil sensor readings, give a 4-point actionable tip.

Soil conditions:
- Moisture: ${sensorData.moisture}%
- pH: ${sensorData.ph}
- Temperature: ${sensorData.temperature}°C
- NPK: ${sensorData.npk}

Respond only in this format:
1. Suitable crop(s): ...
2. Soil treatment: ...
3. Fertilizer advice: ...
4. Irrigation plan: ...
No extra explanations or stories. Keep it to 4 lines only.`;

  try {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: prompt })
    });

    const json = await res.json();
    return json.result || json.response || json.error;
  } catch (err) {
    console.error("Failed to fetch from backend:", err);
    return "⚠️ AI unavailable";
  }
}
