import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiRootTip } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar({ setIsAgriBotOpen }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    // Track logged-in user
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // fallback name = part before @
        const displayName = user.displayName || user.email?.split("@")[0];
        setUsername(displayName);
        setUserEmail(user.email);

        // If you also stored custom name in Firestore (like in Register form)
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists() && docSnap.data().name) {
          setUsername(docSnap.data().name);
        }
        // fetch extra info from Firestore
        if (docSnap.exists()) {
          setUserData({ uid: user.uid, ...docSnap.data() });
        } else {
          // fallback if no Firestore doc
          setUserData({ uid: user.uid, email: user.email });
        }
      } else {
        setUsername("");
        setUserEmail("");
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const [userData, setUserData] = useState(null);

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
    <div className="z-50 sticky top-0 bg-white/30 backdrop-blur-2xl shadow-sm">
      <div className="mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        {location.pathname === "/profile" ? (
          <div className="flex gap-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md">
              <GiRootTip />
            </h1>

            <div>
              <p className="text-sm font-medium text-gray-800">
                {username || "User"}
              </p>
              <p className="text-xs text-gray-500">{userEmail || ""}</p>
            </div>
          </div>
        ) : (
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
          >
            <span className="flex">
              <GiRootTip /> MatiMitra
            </span>
          </h1>
        )}

        {/* Rest of your menu unchanged */}
        <ul className="flex justify-center items-center space-x-6 text-sm font-medium">
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() =>
              `userData.role=="farmer"?${navigate("/farmer")}:${navigate(
                "/farmer"
              )}`
            }
          >
            Dashboard
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => setIsAgriBotOpen(true)}
          >
            AgriBot
          </li>
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