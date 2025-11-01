import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // store extra info in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        farmLocation,
        cropType,
        phone,

        email,
        role,
      });

      // redirect based on role
      if (role === "farmer") navigate("/");
      else if (role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <form
      onSubmit={register}
      className="bg-white max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Register on MatiMitra
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      {/* Farm Location */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Farm Location
        </label>
        <input
          type="text"
          value={farmLocation}
          onChange={(e) => setFarmLocation(e.target.value)}
          placeholder="Enter your farm location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      {/* Crop Type */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Crop Type
        </label>
        <input
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          placeholder="E.g. Sugarcane, Wheat, Rice"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>
      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a strong password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Select Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="farmer">👨‍🌾 Farmer</option>
          <option value="expert">🧑‍🔬 Agronomist</option>
          <option value="admin">🛡 Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/" className="text-green-600 font-medium hover:underline">
          Login here
        </a>
      </p>
    </form>
  );
}