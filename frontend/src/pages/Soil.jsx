import React from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import GovernmentSchemesSection from "../components/soil/GovernmentSchemsSection";
import NutrientAnalysisSection from "../components/soil/NutrientAnalysisSection";
import CropSuggestionSection from "../components/soil/CropSuggestionSection";
import NearbyLabsSection from "../components/soil/NearByLabsSection";
import FertilizerRecommendation from "../components/soil/FertilizerRecommendation";
import WaterInsightsSection from "../components/soil/WaterInsightsSection";

const Soil = () => {
  return (
    <div>
      <FarmerNavbar />

      {/* <SoilTypesSection /> */}
      <NutrientAnalysisSection />
      <CropSuggestionSection />
      <NearbyLabsSection />
      <FertilizerRecommendation />
      <WaterInsightsSection />
      {/* <SoilAndWater /> */}
      <GovernmentSchemesSection />
    </div>
  );
};

export default Soil;
