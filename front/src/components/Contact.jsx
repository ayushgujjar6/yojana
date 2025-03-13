import React from "react";
import { Download, Mail, Phone } from "lucide-react";

function Contact() {
  return (
    <div className="bg-[#162F56] text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between px-6">
        {/* Left Section */}
        <div className="space-y-3">
          <p className="cursor-pointer">• Hyperlinking Policy</p>
          <p className="cursor-pointer">• Privacy Policy</p>
          <p className="cursor-pointer">• Disclaimer</p>
          <p className="cursor-pointer flex items-center">
            <Download size={18} className="mr-2" /> Download User Manual
          </p>
        </div>

        {/* Middle Section - Calendar */}
        <div className="text-center">
          <p className="font-semibold text-lg mb-2">February 2025</p>
          <div className="border border-white rounded-lg p-2 inline-block">
            <table className="text-sm">
              <thead>
                <tr className="border-b">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <th key={day} className="px-2">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[["2", "3", "4", "5", "6", "7", "8"],
                  ["9", "10", "11", "12", "13", "14", "15"],
                  ["16", "17", "18", "19", "20", "21", "22"],
                  ["23", "24", "", "26", "27", "28", ""]].map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td key={j} className={`px-2 ${day === "" ? "" : day % 7 === 2 ? "text-red-500" : day === "26" ? "text-green-500" : ""}`}>
                        {day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm">
            Public Holiday: <span className="text-green-500">Green</span> | Weekly Off: <span className="text-red-500">Red</span>
          </p>
        </div>

        {/* Right Section - Buttons */}
        <div className="flex flex-col space-y-3">
          <button className="border border-white px-4 py-2 rounded-md flex items-center hover:bg-white hover:text-[#162F56] transition">
            <Mail size={18} className="mr-2" /> Office Login
          </button>
          <button className="border border-white px-4 py-2 rounded-md flex items-center hover:bg-white hover:text-[#162F56] transition">
            <Phone size={18} className="mr-2" /> Contact Us
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-6 text-sm opacity-80">
        <p>Website is best viewed with 1280x800 resolution in Firefox 133.0 / Chrome 131.0 / Edge 131.0 or above.</p>
        <p>Visit Count: 243656 | Site Version: 1.0191 | Last Updated: 09-01-2025 10:00 AM</p>
        <p>© 2024. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Contact;
