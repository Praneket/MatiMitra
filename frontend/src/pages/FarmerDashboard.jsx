import { CalendarDays, Download, Space } from "lucide-react";
import FarmerNavbar from "../components/FarmerNavbar";
import Sidebar from "../components/dashboard/Sidebar";
import SensorCard from "../components/dashboard/SensorCard";
// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import SensorChart from "../components/dashboard/SensorChart";
import { getFarmingTip } from "../utils/openai";
import AIRecommendation from "../components/dashboard/AIRecommendation";
function FarmerDashboard() {
  const formattedDate = new Date(Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const [data, setData] = useState({});
  const [advice, setAdvice] = useState("Loading smart farming tip...");
  const [moistureLog, setMoistureLog] = useState([]);
  const [phLog, setPhLog] = useState([]);
  const [tempLog, setTempLog] = useState([]);
  const [npkLog, setNpkLog] = useState([]);

  // Live sensor data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sensors", "current"), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });

    return () => unsub();
  }, []);

  // Generate AI advice when data updates
  useEffect(() => {
    if (data.moisture && data.ph && data.temperature && data.npk) {
      getAgroRecommendation(data)
  .then((tip) => {
    if (!tip || tip.toLowerCase().includes("error") || tip.includes("⚠️")) {
      throw new Error("Invalid response");
    }
    setAdvice(tip);
  })
  .catch(async (err) => {
    console.warn("AgroThink failed:", err);
    setAdvice("⚠️ AI unavailable");
  });

    }
  }, [data]);

  // Live historical logs for charts
  useEffect(() => {
    const q = query(
      collection(db, "sensor_logs"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moist = [];
      const ph = [];
      const temp = [];
      const npk = [];

      snapshot.forEach((doc) => {
        const d = doc.data();
        const time = new Date(d.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        moist.push({ time, value: d.moisture });
        ph.push({ time, value: d.ph });
        temp.push({ time, value: d.temperature });
        npk.push({ time, value: d.npk });
      });

      setMoistureLog(moist.reverse());
      setPhLog(ph.reverse());
      setTempLog(temp.reverse());
      setNpkLog(npk.reverse());
    });

    return () => unsubscribe();
  }, []);

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(advice);
    msg.lang = "en-IN";
    speechSynthesis.speak(msg);
  };
  return (
    <div className="flex">
      <div className="flex-1">
        <FarmerNavbar />
        <div className="flex  lg:flex-row justify-end items-start lg:items-center bg-gray-50 p-4 rounded-md shadow-sm mb-6">
          {/* Left */}

          {/* Right */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="hidden sm:flex items-center gap-2 bg-white border px-3 py-1 rounded shadow-sm text-sm   ">
              <CalendarDays className="w-4 h-4 text-green-600" />
              {formattedDate}
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition flex gap-1">
              <Download className="w-4 h-4 mt-1" />
              <p className="hidden sm:flex " onClick={() => window.print()}>
                Export
              </p>
            </button>
          </div>
        </div>
        <main className="flex-1 bg-gray-50 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SensorCard
              title="Moisture"
              value={data.moisture}
              unit="%"
              image="/moist2.jpeg"
            />
            <SensorCard
              title="Soil pH"
              value={data.ph}
              unit=""
              image="/PH.jpg"
            />
            <SensorCard
              title="Temperature"
              value={data.temperature}
              unit="°C"
              image="/temp.webp"
            />
            <SensorCard
              title="NPK (Raw)"
              value={data.npk}
              unit=""
              image="/npk.jpg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <SensorChart
              title="Moisture (%)"
              dataPoints={moistureLog}
              color="teal"
            />
            <SensorChart title="Soil pH" dataPoints={phLog} color="orange" />
            <SensorChart
              title="Temperature (°C)"
              dataPoints={tempLog}
              color="red"
            />
            <SensorChart title="NPK Level" dataPoints={npkLog} color="purple" />
          </div>
          {/* <AdviceCard advice={advice} speak={speak} /> */}
          <AIRecommendation key={advice} message={advice} speak={speak} />
        </main>
      </div>
    </div>
  );
}

export default FarmerDashboard;
