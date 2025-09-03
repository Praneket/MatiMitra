import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    const docSnap = await getDoc(doc(db, "users", uid));
    const role = docSnap.data()?.role;

    if (role === "farmer") navigate("/farmer");
    else if (role === "expert") navigate("/expert");
    else navigate("/dashboard");
  };

  return (
    <form onSubmit={login} className="p-6">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block mb-4"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}

