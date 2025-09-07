import React from "react";
import { FiMapPin, FiPhone, FiExternalLink } from "react-icons/fi";

const labs = [
  {
    name: "Krishi Soil Testing Lab",
    address: "Pune Agriculture College, Pune, Maharashtra",
    phone: "+91 9876543210",
    maps: "https://maps.google.com?q=Pune+Agriculture+College",
  },
  {
    name: "Agro Soil Lab",
    address: "Main Road, Baramati, Maharashtra",
    phone: "+91 9123456780",
    maps: "https://maps.google.com?q=Baramati+Soil+Lab",
  },
  {
    name: "Govt Soil Health Center",
    address: "Taluka Road, Sangli, Maharashtra",
    phone: "+91 9988776655",
    maps: "https://maps.google.com?q=Sangli+Soil+Health+Center",
  },
];

const NearbyLabsSection = () => {
  return (
    <section className="bg-white mt-8 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Nearest Soil Testing Laboratories
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            className="border border-green-100 bg-green-50 p-4 rounded-lg hover:shadow-md transition-transform hover:scale-[1.02]"
          >
            <h3 className="text-green-800 font-semibold text-lg mb-1">
              {lab.name}
            </h3>
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <FiMapPin className="mt-0.5" />
              {lab.address}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
              <FiPhone />
              {lab.phone}
            </p>
            <a
              href={lab.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 text-sm mt-2 hover:underline"
            >
              <FiExternalLink className="mr-1" /> View on Map
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyLabsSection;
