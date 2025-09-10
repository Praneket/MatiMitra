import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function UserDashboard() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const uid = auth.currentUser?.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      setRole(userDoc.data()?.role);
    };
    fetchRole();
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
}
