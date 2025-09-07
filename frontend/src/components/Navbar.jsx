import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiRootTip } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SimpleModal from "./agribot/SimpleModal";
export default function Navbar({ setIsAgriBotOpen }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const onClose = () => {
    setIsOpen(false);
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    // Check Firebase auth user for displayName
    const user = auth.currentUser;
    if (user) {
      const name = user.displayName || user.email?.split("@")[0]; // fallback
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="z-50 sticky  top-0 bg-white/30 backdrop-blur-2xl shadow-sm">
      <div className=" mx-auto  px-6 py-4 flex flex-col sm:flex-row items-center justify-between ">
        {location.pathname === "/profile" ? (
          <div className="flex gap-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300">
              <GiRootTip />
            </h1>

            <div>
              <p className="text-sm font-medium text-gray-800">
                {username || "User"}
              </p>
              <p className="text-xs text-gray-500">jadhavpraneket@gmail.com</p>
            </div>
          </div>
        ) : (
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
          >
            <span className="flex">
              <GiRootTip /> RootSense
            </span>
          </h1>
        )}

        <ul className="flex justify-center items-center space-x-6 text-sm font-medium">
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/farmer")}
          >
            Dashboard
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            // onClick={() => navigate("/agribot")}
            onClick={() => setIsAgriBotOpen(true)}
          >
            AgriBot
          </li>
          {/* <SimpleModal isOpen={isOpen} onClose={onClose}>
            <p>This is the AgriBot assistant modal!</p>
            <button className="bg-green-500 text-white px-4 py-1 rounded">
              Try Now
            </button>
          </SimpleModal> */}
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/reviews")}
          >
            Reviews
          </li>

          {/* Profile Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
              <FaUserCircle className="w-6 h-6" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer flex"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    <IoIosPerson className="mt-1 mr-1" /> Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer flex"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <RiLogoutBoxLine className="m-1" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
