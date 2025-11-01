// 📁 src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Lock, CalendarDays, Download, User } from "lucide-react";
import { GiHamburgerMenu, GiRootTip } from "react-icons/gi";
import Sidebar from "./dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AdminSidebar from "./dashboard/AdminSidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx"

const userImg = "/img1.webp";

const FarmerNavbar = () => {
  const [show, setShow] = useState(false);
  //const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const {userData} = useAuth();

  // useEffect(() => {
  //   // Track logged-in user
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // fetch extra info from Firestore
  //       const docSnap = await getDoc(doc(db, "users", user.uid));
  //       if (docSnap.exists()) {
  //         setUserData({ uid: user.uid, ...docSnap.data() });
  //       } else {
  //         // fallback if no Firestore doc
  //         setUserData({ uid: user.uid, email: user.email });
  //       }
  //     } else {
  //       setUserData(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  console.log("userData",userData);

  return (
    <>
      <header className="flex items-center justify-between bg-white p-4 border-b shadow-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <div
            className=" cursor-pointer mt-1 text-xl"
            onClick={() => setShow(!show)}
          >
            <GiHamburgerMenu />
          </div>
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
          >
            <span className="flex">
              <GiRootTip /> MatiMitra
            </span>
          </h1>
        </div>

        <div className="relative">
          {/* Green dot */}
          <span className="absolute w-3 h-3 rounded-full bg-green-500 shadow-md z-10"></span>

          <div
            className="flex items-center gap-6 shadow-md rounded-md hover:shadow-stone-500 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="flex items-center gap-3 p-2">
              {userImg ? (
                <img
                  src={userImg}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="text-gray-600 w-5 h-5" />
              )}
              <div className="hidden sm:flex">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {userData?.name || "Loading..."}
                    
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.email || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {!userData ? (
        <p>Loading...</p>
      ) : userData.role === "admin" ? (
        <AdminSidebar show={show} setShow={setShow} />
      ) : (
        <Sidebar show={show} setShow={setShow} />
      )}
    </>
  );
};

export default FarmerNavbar;