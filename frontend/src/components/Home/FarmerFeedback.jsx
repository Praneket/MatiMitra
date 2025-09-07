// 📁 src/components/FarmerFeedback.jsx
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const feedbacks = [
  {
    name: "Ramesh Patil",
    location: "Maharashtra, India",
    message:
      "RootSense has helped me understand my soil better. I reduced fertilizer usage and still increased crop yield!",
    image: "/PH.jpg",
  },
  {
    name: "Sunita Devi",
    location: "Bihar, India",
    message:
      "With real-time soil monitoring, I no longer guess. I take informed decisions that save money and improve soil health.",
    image: "/PH.jpg",
  },
  {
    name: "Harinder Singh",
    location: "Punjab, India",
    message:
      "AI suggestions from RootSense are like having an expert in my pocket. I trust it more than my old methods now!",
    image: "/PH.jpg",
  },
];

export default function FarmerFeedback() {
  return (
    <section className="bg-green-50 py-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-10">
        Hear From Our Farmers
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks.map((f, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            data-aos="fade-up"
          >
            <div className="flex items-center mb-4">
              <img
                src={f.image}
                alt={f.name}
                className="w-14 h-14 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">{f.name}</p>
                <p className="text-sm text-gray-500">{f.location}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              <FaQuoteLeft className="inline-block text-green-500 mr-2 mb-1" />
              {f.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
