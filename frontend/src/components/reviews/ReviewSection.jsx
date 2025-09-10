import { Star } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewsSection = ({ reviews }) => {
  const sortedReviews = reviews.slice().reverse();

  return (
    <section className="bg-green-50 py-14 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          What People Think <span className="text-red-600">About Us</span>
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
          Hear directly from farmers how RootSense has transformed their
          agriculture with smarter soil decisions and sustainable practices.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedReviews.map((review, index) => (
            <div
              key={review.id}
              className="relative bg-white border border-gray-200 shadow-md p-6 rounded-xl hover:shadow-xl transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <FaQuoteLeft className="text-green-600 text-xl absolute top-4 left-4" />

              <p className="text-gray-700 mt-6 italic mb-4">
                "{review.comment}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-left">
                  <p className="text-md font-semibold text-gray-800">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>

                {/* Stars */}
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-400"
                    />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
