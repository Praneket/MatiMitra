// 📁 src/components/Sidebar.jsx
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  Home,
  Droplet,
  CloudSun,
  ListChecks,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GiRootTip } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";

const navItems = [
  { name: "Home", icon: <Home />, path: "/dashboard" },

  { name: "Report & Analytics", icon: <BarChart2 />, path: "/farmer" },
  { name: "Soil & Water", icon: <Droplet />, path: "/soil" },
  { name: "Weather", icon: <CloudSun />, path: "/weather" },
  { name: "Task Management", icon: <ListChecks />, path: "/tasks" },
];

const bottomItems = [
  { name: "Setting", icon: <Settings /> },
  { name: "Help & Support", icon: <HelpCircle /> },
];

export default function Sidebar({ show, setShow }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white border-r shadow-lg p-4 
        flex flex-col justify-between z-40
        transform transition-transform duration-500 ease-in-out
        ${show ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div>
          <div
            className=" cursor-pointer flex justify-end mr-0 text-gray-500"
            onClick={() => setShow(false)}
          >
            <IoClose />
          </div>
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
          >
            <span className="flex mb-3">
              <GiRootTip /> RootSense
            </span>
          </h1>

          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-green-100 text-gray-700 ${
                  pathname === item.path ? "bg-green-100 font-medium" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Items */}
        <div className="space-y-3 text-gray-600">
          {bottomItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
