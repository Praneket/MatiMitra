import { useState } from "react";
import { Star, X } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (name && location && comment && rating) {
      onSubmit({ name, location, comment, rating });
      setName("");
      setLocation("");
      setComment("");
      setRating(0);
      onClose();
    } else {
      alert("Please fill all fields and select rating.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-green-700">
          Write a Review
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-md p-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Location"
            className="w-full border rounded-md p-2 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            placeholder="Your Feedback"
            className="w-full border rounded-md p-2 text-sm"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  className={`w-5 h-5 ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
