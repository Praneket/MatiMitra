import { CalendarDays, Download } from "lucide-react";
import FarmerNavbar from "../components/FarmerNavbar";
import SensorCard from "../components/dashboard/SensorCard";
import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import {
//   doc,
//   onSnapshot,
//   collection,
//   query,
//   orderBy,
//   limit,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";
import SensorChart from "../components/dashboard/SensorChart";
import { getFarmingTip } from "../utils/openai";
import SoilNutrientDonuts from "../components/dashboard/SoilNutrientDonuts";
import SoilHealth from "../components/SoilHealth";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import { getAgroRecommendation } from "../utils/agrothink";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { db, rtdb, auth } from "../firebase";

function FarmerDashboard() {
  const formattedDate = new Date(Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const [data, setData] = useState({});
  const [advice, setAdvice] = useState("Loading smart farming tip...");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const [moistureLog, setMoistureLog] = useState([]);
  const [phLog, setPhLog] = useState([]);
  const [tempLog, setTempLog] = useState([]);
  const [nLog, setNLog] = useState([]);
  const [pLog, setPLog] = useState([]);
  const [kLog, setKLog] = useState([]);
  const [microLogs, setMicroLogs] = useState({
    Zn: [],
    Fe: [],
    Mn: [],
    Cu: [],
  });

  const [lastSentTimestamp, setLastSentTimestamp] = useState(0); // Track last POST to backend

  // 🔴 Live sensor data
  useEffect(() => {
    const liveRef = query(ref(rtdb, "liveData"), limitToLast(1));
    const unsub = onValue(liveRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const latestKey = Object.keys(dataObj)[0];
        const latestData = dataObj[latestKey];

        setData({
          moisture: latestData.soil_moisture,
          ph: latestData.pH,
          temperature: latestData.temperature,
          npk: { N: 40, P: 35, K: 30 },
          microNutrients: { Zn: 2.1, Fe: 3.4, Mn: 1.8, Cu: 0.9 },
          timestamp: latestData.timestamp,
        });
      }
    });

    return () => unsub();
  }, []);

  // 🤖 Generate AI advice when data updates
  useEffect(() => {
    if (data.moisture && data.ph && data.temperature && data.npk) {
      getAgroRecommendation(data)
        .then((tip) => {
          if (!tip || tip.toLowerCase().includes("error") || tip.includes("⚠️")) {
            throw new Error("Invalid AgroThink response");
          }
          setAdvice(tip);
        })
        .catch(async (err) => {
          console.warn("AgroThink failed:", err);
          try {
            const tip = await getFarmingTip(data);
            setAdvice(tip || "⚠️ AI unavailable");
          } catch (e) {
            console.error("OpenAI failed too:", e);
            setAdvice("⚠️ AI unavailable");
          }
        });
    }
  }, [data]);

  // 📊 Historical logs
  useEffect(() => {
    const logsRef = query(ref(rtdb, "liveData"), limitToLast(10));

    const unsub = onValue(logsRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const dataObj = snapshot.val();
      const logs = Object.values(dataObj);

      const moist = [];
      const phArr = [];
      const tempArr = [];

      logs.forEach((d) => {
        let dateObj = null;
        let formattedTime = "NA";

        if (d.timestamp) {
          const parts = d.timestamp.split(/[- :]/);
          if (parts.length === 6) {
            const [day, month, year, hour, minute, second] = parts.map(Number);
            dateObj = new Date(year, month - 1, day, hour, minute, second);
            formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          }
        }

        moist.push({ time: dateObj, display: formattedTime, value: d.soil_moisture });
        phArr.push({ time: dateObj, display: formattedTime, value: d.pH });
        tempArr.push({ time: dateObj, display: formattedTime, value: d.temperature });
      });

      setMoistureLog([...moist.reverse()]);
      setPhLog([...phArr.reverse()]);
      setTempLog([...tempArr.reverse()]);
    });

    return () => unsub();
  }, []);

  // 🔴 Throttled backend POST every 5 mins
  useEffect(() => {
    if (!data || !data.timestamp) return;

    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (now - lastSentTimestamp >= fiveMinutes) {
      fetch("http://127.0.0.1:8000/get_agro_recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log("✅ Backend response:", resData);
          setRecommendation(resData.recommendation);
        })
        .catch((err) => console.error("❌ Backend error:", err));

      setLastSentTimestamp(now);
    }
  }, [data, lastSentTimestamp]);

  const speak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const msg = new SpeechSynthesisUtterance(advice);
      msg.lang = "en-IN";
      msg.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(msg);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <FarmerNavbar />
        <div className="flex justify-end items-center bg-gray-50 bg p-4 rounded-md shadow-sm mb-6">
          <div className="hidden sm:flex items-center gap-2 bg-white border px-3 py-1 rounded shadow-sm text-sm">
            <CalendarDays className="w-4 h-4 text-green-600" />
            {formattedDate}
          </div>
          <button
            className="ml-4 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition flex gap-1"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mt-1" />
            <p className="hidden sm:flex">Export</p>
          </button>
        </div>

        <main className="flex-1 bg-gray-50 p-6">
          {/* Sensor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SensorCard title="Moisture" value={data.moisture} unit="%" image="/moist2.jpeg" />
            <SensorCard title="Soil pH" value={data.ph} image="/PH.jpg" />
            <SensorCard title="Temperature" value={data.temperature} unit="°C" image="/temp.webp" />
            {data.npk && (
              <SensorCard title="NPK" value={{ N: data.npk.N, P: data.npk.P, K: data.npk.K }} image="/npk.jpg" />
            )}
          </div>

          {!data?.npk ? (
            <div className="animate-pulse p-4 rounded-lg bg-gray-100 text-gray-400">
              Loading Soil Health...
            </div>
          ) : (
            <SoilHealth
              readings={{
                pH: data.ph,
                moisture: data.moisture,
                nitrogen: data.npk.N,
                phosphorus: data.npk.P,
                potassium: data.npk.K,
                temperature: data.temperature,
              }}
            />
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            {data.npk && data.microNutrients && (
              <div className="">
                <SoilNutrientDonuts npk={data.npk} microNutrients={data.microNutrients} />
              </div>
            )}

            <SensorChart title="Moisture (%)" dataPoints={moistureLog} color="teal" />
            <SensorChart title="Soil pH" dataPoints={phLog} color="orange" />
            <SensorChart title="Temperature (°C)" dataPoints={tempLog} color="red" />
            <div className="mt-6 col-span-full">
              <AIRecommendation key={advice} message={advice} speak={speak} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FarmerDashboard;
