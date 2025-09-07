// src/pages/Dashboard.js
import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import { getFarmingTip } from "../utils/openai";
import Carousel from "../components/Home/Carousel";
import AboutRootSense from "../components/Home/AboutRootSense";
import SoilTrendSection from "../components/Home/SoilTrendSection";
import { TypeAnimation } from "react-type-animation";
import Footer from "../components/Footer";
import SubscribeSection from "../components/Home/SubscribeSection";
import FarmerFeedback from "../components/Home/FarmerFeedback";
import AgriBotButton from "../components/agribot/AgriButton";
import SimpleModal from "../components/agribot/SimpleModal";

export default function Dashboard() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Trigger once
    });
  }, []);

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
      getFarmingTip(data).then((tip) => setAdvice(tip));
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

  const message = `“Your soil is low on potassium. Apply potassium-rich fertilizer
              tomorrow morning. Also, consider watering the field today to
              maintain optimal moisture.”`;

  const [isAgriBotOpen, setIsAgriBotOpen] = useState(false);

  // Function to be passed to Navbar
  const handleAgriBotOpen = () => {
    setIsAgriBotOpen(true);
  };

  const handleAgriBotClose = () => {
    setIsAgriBotOpen(false);
  };

  return (
    <div className="bg-white min-h-screen ">
      <Navbar setIsAgriBotOpen={setIsAgriBotOpen} />
      <div className="">
        {/* Pass function to Navbar via context or props */}

        {/* Modal rendering here */}
        <SimpleModal
          isOpen={isAgriBotOpen}
          onClose={handleAgriBotClose}
        ></SimpleModal>
      </div>
      <Carousel />
      <div className="p-6">
        <AboutRootSense />
        <SoilTrendSection />
        <div
          className="bg-green-50 rounded-xl p-10 my-12 shadow-md"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Get AI Recommendations
          </h2>
          <p className="text-center text-gray-700 mb-6 text-lg max-w-3xl mx-auto">
            Based on real-time sensor data, RootSense provides actionable
            AI-driven suggestions to help farmers make smarter decisions for
            soil health, fertilizer usage, irrigation, and crop planning.
          </p>

          <div className="bg-white border-l-4 border-green-500 p-6 rounded shadow-inner max-w-2xl mx-auto">
            <p className="text-lg text-gray-800 italic">
              <TypeAnimation
                sequence={[message]}
                speed={40}
                wrapper="span"
                cursor={true}
                className="text-gray-800 text-base font-medium leading-relaxed"
              />
            </p>
          </div>
        </div>

        {/*         
        <AdviceCard advice={advice} speak={speak} />

        
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
        <SensorChart title="NPK Level" dataPoints={npkLog} color="purple" /> */}
        <FarmerFeedback />

        <SubscribeSection />
        <AgriBotButton />
      </div>
      <Footer />
    </div>
  );
}
