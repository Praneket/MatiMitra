import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import Weather from "./components/Weather";
import Reviews from "./pages/Reviews";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import Soil from "./pages/Soil";
import "./ChartSetup";
import Tasks from "./pages/Tasks";
import AgriBotButton from "./components/agribot/AgriButton";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <PrivateRoute>
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/expert"
          element={
            <PrivateRoute>
              <ExpertDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/soil"
          element={
            <PrivateRoute>
              <Soil />
            </PrivateRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <PrivateRoute>
              <Weather />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <AgriBotButton />
    </BrowserRouter>
  );
}

export default App;
