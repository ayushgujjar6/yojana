import React from "react";

const sectors = [
  { name: "Social Welfare", schemes: 111, icon: "\u{1F91D}" },
  { name: "Education", schemes: 77, icon: "\u{1F393}" },
  { name: "Sports, Youth & Cultural Activities", schemes: 53, icon: "\u{1F3C6}" },
  { name: "Agriculture", schemes: 49, icon: "\u{1F33F}" },
  { name: "Labour Welfare", schemes: 36, icon: "\u{1F477}" },
  { name: "Employment", schemes: 35, icon: "\u{1F4BC}" },
];

const SectorCard = ({ sector }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition">
    <div className="text-4xl bg-gray-100 p-4 rounded-full">{sector.icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{sector.name}</h3>
      <p className="text-orange-600 font-medium">{sector.schemes} Schemes</p>
    </div>
  </div>
);

const SectorSchemes = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-orange-600 font-semibold">Sectors</p>
        <h2 className="text-2xl font-bold text-[#162F56] mb-4">
          Get Sector-Specific Schemes
        </h2>
        <p className="text-gray-600 mb-8">
          Discover the right scheme based on your needs and eligibility within
          specific sector.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <SectorCard key={index} sector={sector} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-[#162F56] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#DC6803] cursor-pointer">
          View All
        </button>
      </div>
    </div>
  );
};

export default SectorSchemes;
