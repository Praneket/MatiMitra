import React from "react";
import { FaSeedling, FaLeaf, FaRecycle, FaFlask } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
const AboutRootSense = () => {
  return (
    <div className="bg-green-50 rounded-xl p-10 my-12 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* About Us */}
        <div data-aos="fade-up" className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              About RootSense
            </h2>
            <p className="text-gray-700 text-lg leading-10">
              RootSense is a smart farming initiative that bridges soil science
              and artificial intelligence. Our mission is to empower farmers
              with real-time insights about their soil health using IoT sensors
              and AI-based recommendations — increasing productivity while
              protecting the environment.
              <br />
              <br />
              RootSense ensures sustainable agriculture by making data-driven
              farming decisions simple, accessible, and eco-friendly.
            </p>
          </div>

          {/* Contact Info (optional) */}
          <div className="mt-6 text-gray-700 space-y-2 ">
            <p className="flex gap-1 items-center">
              <span className="font-semibold">
                <FiPhoneCall />
              </span>{" "}
              +91 9876543210
            </p>
            <p className="flex gap-1 items-center">
              <span className="font-semibold">
                <MdOutlineEmail />
              </span>{" "}
              rootsense@farmtech.ai
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Why RootSense?
          </h2>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div
              data-aos="fade-up"
              className="bg-white p-5 rounded shadow hover:shadow-lg transition"
            >
              <img
                src="/Soil_Feedback2.jpg"
                className="rounded-sm"
                alt="Soil feedback"
              />

              <p className="font-medium mt-1 text-gray-700 ">
                1.Real-time Soil Feedback
              </p>
            </div>
            <div
              className="bg-white p-5 rounded shadow hover:shadow-lg transition"
              data-aos="fade-up"
            >
              <img src="/Eco.jpg" className="rounded-sm" alt="Soil feedback" />

              <p className="font-medium mt-1 text-gray-700 ">
                2.Biodegradable – No Waste
              </p>
            </div>
            <div
              className="bg-white p-5 rounded shadow hover:shadow-lg transition text-gray-700 "
              data-aos="fade-up"
            >
              <img
                src="/Regerative.jpg"
                className="rounded-sm"
                alt="Soil feedback"
              />

              <p className="font-medium mt-1 text-gray-700 ">
                3.Promotes Regenerative Farming
              </p>
            </div>
            <div
              className="bg-white p-5 rounded shadow hover:shadow-lg transition"
              data-aos="fade-up"
            >
              <img
                src="/Reduce_Overuse.jpg"
                className="rounded-sm "
                alt="Soil feedback"
              />

              <p className="font-medium mt-1 text-gray-700 ">
                4.Reduces Overuse of Fertilizers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRootSense;
