import React from "react";
import { FaSearch, FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdAccessibility } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Left Side - Logos */}
      <div className="flex items-center space-x-4">
        <img
          src="https://mariyojana.gujarat.gov.in/Images/img/logo.png"
          alt="Government Logo"
          className="h-15"
        />
        {/* <img
          src="https://example.com/your-logo.png"
          alt="Your Organization Logo"
          className="h-10"
        /> */}
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md py-3 px-40 pr-8 focus:outline-none"
        />
        <FaSearch className="absolute right-3 text-gray-400" />
      </div>

      {/* Right Side - Icons & Controls */}
      <div className="flex items-center space-x-2">
        {/* Screen Reader Access */}
        <div className="flex items-center space-x-4 text-[#162F56] cursor-pointer">
      <div className="bg-[#162F56] p-1 border border-[#162F56] rounded-md">
      <FaHome className="text-3xl text-white" />
      </div>
        <span className="font-bold">Screen Reader Access</span>
      </div>


        {/* Font Size Adjustments */}
        <div className="flex space-x-2">
  <button className="border rounded-full p-2 w-10 h-10 text-sm font-bold flex items-center justify-center cursor-pointer">A+</button>
  <button className="border rounded-full p-2 w-10 h-10 text-sm font-bold flex items-center justify-center cursor-pointer">A</button>
  <button className="border rounded-full p-2 w-10 h-10 text-sm font-bold flex items-center justify-center cursor-pointer">A-</button>
</div>


 

        {/* Accessibility Button */}
        <button className="border rounded-full p-2 flex items-center justify-center">
          <MdAccessibility size={20} />
        </button>

        {/* Contact Us Button */}
        <button className="bg-[#162F56] text-white px-4 py-4 w-36 rounded-xl flex items-center hover:bg-[#DC6803] cursor-pointer">
          <IoMdContact className="mr-2" size={18} />
          Contact Us
        </button>
      </div>
    </header>
  );
};

export default Header;
