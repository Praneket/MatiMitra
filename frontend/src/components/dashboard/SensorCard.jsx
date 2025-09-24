export default function SensorCard({ title, value, unit, image }) {
  const renderValue = () => {
    if (value && typeof value === "object") {
      // NPK case
      if ("N" in value && "P" in value && "K" in value) {
        return (
          <>
            N: {value.N} | P: {value.P} | K: {value.K}
          </>
        );
      }

      // Micronutrients case
      if ("Zn" in value || "Fe" in value || "Mn" in value || "Cu" in value) {
        return (
          <>
            Zn: {value.Zn ?? "-"} | Fe: {value.Fe ?? "-"} | Mn:{" "}
            {value.Mn ?? "-"} | Cu: {value.Cu ?? "-"}
          </>
        );
      }
    }

    // Fallback: normal values (moisture, ph, temp)
    return (
      <>
        {value}
        <span className="text-xl text-gray-500"> {unit}</span>
      </>
    );
  };

  return (
    <div
      data-aos="fade-up"
      className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 
             hover:shadow-xl hover:border-green-300 
             transition-all duration-300 ease-in-out"
    >
      {/* Image */}
      <img src={image} alt={title} className="w-full h-44 object-cover" />

      {/* Text Section */}
      <div className="p-4 text-center bg-green-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-green-700">{renderValue()}</p>
      </div>
    </div>
  );
}