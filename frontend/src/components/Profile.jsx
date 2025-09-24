import React, { useState } from "react";
import { FiEdit, FiMapPin, FiSave } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Dnyaneshwari Taware",
    email: "dnyanu@MatiMitra.ai",
    phone: "+91 9876543210",
    image: "/img1.webp",
    location: "Pune, Maharashtra",
  });

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Save logic (Firebase/Backend integration can go here)
    alert("Profile updated!");
  };

  const soilData = [
    { day: "Mon", moisture: 32, ph: 6.2, temp: 27, npk: 50 },
    { day: "Tue", moisture: 34, ph: 6.5, temp: 28, npk: 55 },
    { day: "Wed", moisture: 31, ph: 6.4, temp: 26, npk: 60 },
    { day: "Thu", moisture: 35, ph: 6.6, temp: 29, npk: 65 },
    { day: "Fri", moisture: 36, ph: 6.7, temp: 30, npk: 70 },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-green-50">
      {/* Side Profile */}
      <aside
        className="w-full lg:w-1/4
      md:w-1/3 bg-green-100 shadow-md p-6 lg:sticky top-0 h-fit"
      >
        <div
          className="flex flex-col lg:min-h-screen 
        md:min-h-screen 
        items-center text-center"
        >
          <img
            src={user.image}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mb-4 shadow-md"
          />

          {editMode ? (
            <>
              <input
                className="text-lg font-bold text-green-800 mb-1 text-center bg-transparent border-b outline-none"
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                className="text-sm text-gray-600 mb-1 text-center bg-transparent border-b outline-none"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <input
                className="text-sm text-gray-600 text-center bg-transparent border-b outline-none"
                value={user.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-green-800">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.phone}</p>
            </>
          )}

          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded w-full max-w-sm flex items-center justify-center gap-2"
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            {editMode ? <FiSave /> : <FiEdit />}
            {editMode ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center text-green-800 text-lg font-medium mb-6">
          <FiMapPin className="mr-2 text-xl" />
          {editMode ? (
            <input
              className="bg-transparent border-b border-green-400 outline-none w-1/2"
              value={user.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          ) : (
            <span>{user.location}</span>
          )}
        </div>

        {/* Card Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white p-5 rounded-lg shadow hover:scale-[1.02] transition-transform">
            <h3 className="text-green-700 font-semibold mb-2">Land Tracked</h3>
            <p className="text-gray-800 text-lg font-bold">4.8 Acres</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:scale-[1.02] transition-transform">
            <h3 className="text-green-700 font-semibold mb-2">
              Last Soil Scan
            </h3>
            <p className="text-gray-800 text-lg font-bold">18 July 2025</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:scale-[1.02] transition-transform">
            <h3 className="text-green-700 font-semibold mb-2">Soil Type</h3>
            <p className="text-gray-800 text-lg font-bold">Loamy Soil</p>
          </div>
        </div>

        {/* Soil Overview Chart */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow">
          <h3 className="text-green-700 font-semibold mb-4">Soil Overview</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={soilData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moisture" stroke="#34D399" />
                <Line type="monotone" dataKey="ph" stroke="#3B82F6" />
                <Line type="monotone" dataKey="temp" stroke="#F59E0B" />
                <Line type="monotone" dataKey="npk" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow hover:scale-[1.02] transition-transform">
          <h3 className="text-green-700 font-semibold mb-4">Activity Logs</h3>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
            <li>Scanned Soil on 18th July</li>
            <li>Added drip irrigation setup</li>
            <li>Updated NPK fertilizer usage</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
