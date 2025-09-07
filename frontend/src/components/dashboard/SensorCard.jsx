export default function SensorCard({ title, value, unit, image }) {
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
      <div className="p-4 text-center  bg-green-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-green-700">
          {typeof value === "object" ? (
            <>
              N: {value.nitrogen} P: {value.phosphorus} K: {value.potassium}
            </>
          ) : (
            <>
              {value}
              <span className="text-xl text-gray-500"> {unit}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
