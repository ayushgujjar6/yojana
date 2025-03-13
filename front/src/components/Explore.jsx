import React from "react";
import { Search, FileText, MousePointerClick } from "lucide-react";

function Explore() {
  return (
    <div className="bg-gray-100 py-10 flex flex-col items-center">
      {/* Title Section */}
      <h4 className="text-[#162F56]">How It Works</h4>
      <h2 className="text-3xl font-bold text-[#162F56] mt-2">
        Easy Steps To Apply <br />  <span className="block text-center"> for Schemes</span>
      </h2>

      {/* Steps Section */}
      <div className="flex justify-around mt-10 w-3/4">
        {/* Search Step */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#162F56] p-5 rounded-xl">
            <Search size={40} color="white" />
          </div>
          <h3 className="text-[#162F56] font-semibold mt-3">Search</h3>
          <p className="text-gray-600">
            Our search engine will <span className="text-orange-600">find the relevant schemes!</span>
          </p>
        </div>

        {/* Enter Details Step */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#162F56] p-5 rounded-xl">
            <FileText size={40} color="white" />
          </div>
          <h3 className="text-[#162F56] font-semibold mt-3">Enter Details</h3>
          <p className="text-gray-600">
            Start by entering your <span className="text-orange-600">basic details!</span>
          </p>
        </div>

        {/* Select & Apply Step */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#162F56] p-5 rounded-xl">
            <MousePointerClick size={40} color="white" />
          </div>
          <h3 className="text-[#162F56] font-semibold mt-3">Select & Apply</h3>
          <p className="text-gray-600">
            <span className="text-orange-600">Select and apply</span> for the best suited scheme.
          </p>
        </div>
      </div>

      {/* Explore Now Button */}
      <button className="bg-[#162F56] hover:bg-[#DC6803] cursor-pointer text-white px-6 py-3 mt-8 rounded-lg text-lg font-semibold">
        Explore Now
      </button>
    </div>
  );
}

export default Explore;


