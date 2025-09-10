// src/pages/Reviews.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SimpleModal from "../components/agribot/SimpleModal";
import ReviewsSection from "../components/reviews/ReviewSection";
import ReviewModal from "../components/reviews/ReviewModal";
import Footer from "../components/Footer";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Reviews() {
  const [isAgriBotOpen, setIsAgriBotOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const reviewsRef = collection(db, "reviews");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(reviewsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetched);
    };
    fetchReviews();
  }, []);

  const handleAddReview = async (newReview) => {
    const reviewWithTimestamp = {
      ...newReview,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(reviewsRef, reviewWithTimestamp);
      setReviews((prev) => [{ ...newReview, id: docRef.id }, ...prev]);
    } catch (err) {
      console.error("Error adding review: ", err);
    }
  };

  return (
    <>
      <Navbar setIsAgriBotOpen={setIsAgriBotOpen} />
      <SimpleModal
        isOpen={isAgriBotOpen}
        onClose={() => setIsAgriBotOpen(false)}
      />

      <div className="flex justify-end items-center p-4 bg-gradient-to-r from-green-400 to-white">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Write a Review
        </button>
      </div>

      <ReviewsSection reviews={reviews} />

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />

      <Footer />
    </>
  );
}
