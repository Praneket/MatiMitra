import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const schemes = [
  {
    name: "PM-Kisan",
    desc: "₹6000 annual support to small & marginal farmers directly in their bank accounts.",
    image: "/schemes/PM-Kiasan.jpeg", // Replace with your public path or URL
    link: "https://pmkisan.gov.in/",
  },
  {
    name: "PMKSY",
    desc: "Pradhan Mantri Krishi Sinchayee Yojana ensures irrigation to every field.",
    image: "/schemes/PMKSY.webp",
    link: "https://pmksy.gov.in/",
  },
  {
    name: "Soil Health Card",
    desc: "Get soil health reports to guide optimal fertilizer usage for your land.",
    image: "/schemes/SHC.webp",
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    name: "Fasal Bima Yojana",
    desc: "Crop insurance to protect against losses due to natural calamities.",
    image: "/schemes/Fasal-Bima.jpg",
    link: "https://pmfby.gov.in/",
  },
];

const GovernmentSchemesSection = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-16">
      <h2 className="text-3xl font-extrabold text-green-800 mb-8 text-center">
        <span className="text-red-700"> Government Schemes</span> for Farmers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {schemes.map((scheme, idx) => (
          <div
            key={idx}
            className="bg-green-50 rounded-xl shadow hover:shadow-md transition p-5 flex items-center gap-4 "
            data-aos="fade-up"
          >
            <img
              src={scheme.image}
              alt={scheme.name}
              className="w-20 h-20 object-contain rounded-lg bg-white border p-2"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800">
                {scheme.name}
              </h3>
              <p className="text-gray-700 text-sm mb-2">{scheme.desc}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline flex items-center gap-1 text-sm"
              >
                Learn More <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GovernmentSchemesSection;
