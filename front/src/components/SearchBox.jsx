import React from "react";

const SearchBox = () => {
  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 py-10 relative">
      {/* Mouse Scroll Icon Centered */}
      <div className="flex justify-center mb-6">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-gray-400 animate-bounce"></div>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[85%] max-w-[1300px] flex flex-col justify-center items-center mx-auto relative z-10">
        <h2 className="text-orange-500 text-lg font-semibold">Search by keyboard.</h2>
        <h1 className="text-4xl font-bold text-[#162F56] mt-1">Find your scheme</h1>
        <div className="mt-4 w-full max-w-[900px] flex flex-col items-center">
          <input
            type="text"
            placeholder="Write the word here e.g., accommodation, scholarship, etc..."
            className="w-full p-3 outline-none border border-gray-300 rounded-lg"
          />
          <button className="bg-[#162F56] text-white px-6 py-3 rounded-lg mt-4 hover:bg-orange-500 transition duration-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
