import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SimpleModal from "../components/agribot/SimpleModal";
import Profile from "../components/Profile";
const ProfilePage = () => {
  const [isAgriBotOpen, setIsAgriBotOpen] = useState(false);

  // Function to be passed to Navbar
  const handleAgriBotOpen = () => {
    setIsAgriBotOpen(true);
  };

  const handleAgriBotClose = () => {
    setIsAgriBotOpen(false);
  };
  return (
    <>
      <Navbar setIsAgriBotOpen={setIsAgriBotOpen} />
      <SimpleModal
        isOpen={isAgriBotOpen}
        onClose={handleAgriBotClose}
      ></SimpleModal>
      <div>
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;