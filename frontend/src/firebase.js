// Replace config with yours from Firebase Console
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAGNgzqDOtQ0ljmMIUl-uxiqYAh1JeT1Pw",
  authDomain: "rootsense-e5557.firebaseapp.com",
  projectId: "rootsense-e5557",
  storageBucket: "rootsense-e5557.firebasestorage.app",
  messagingSenderId: "1088832964488",
  appId: "1:1088832964488:web:db2eaea66395b47bfb5c3d",
  databaseURL: "https://rootsense-e5557-default-rtdb.firebaseio.com"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);

export { db, rtdb, auth };
