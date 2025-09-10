// 📁 src/components/SubscribeSection.jsx
import React, { useState } from "react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // You can integrate Mailchimp, Firebase, or a backend here
    console.log("Subscribed email:", email);
    alert("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <div className="bg-green-50 py-12 mt-4 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600 mb-6">
        Subscribe Now
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Subscribe to get weekly insights & sustainable agriculture strategies.
      </p>
      <form
        onSubmit={handleSubscribe}
        className="max-w-4xl mx-auto flex rounded-full overflow-hidden border border-black shadow-lg"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-full px-6 py-3 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 hover:bg-gray-900 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribeSection;
