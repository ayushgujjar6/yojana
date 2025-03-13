import React from "react";
import { FileText } from "lucide-react"; // Icon Import

const cardData = [
  "Schemes", "Services", "Certificate", "Search By Keyword",
  "Personalised Search", "Search By Sector", "Search By Department", "Search By Image",
  "Search By Category", "Search By Applicable Areas", "Search By Beneficiary", "Search By Benefits",
  "Search By Scheme Target", "Search By Schemes Owned", "Search Forms", "Search GR/Orders"
];

const Cards = () => {
  return (
    <div className="container flex flex-wrap justify-center gap-6 p-8 min-h-screen bg-gray-100 mt-5">

      {cardData.map((title, index) => (
        <a
          key={index}
          href="#"
          className="w-[300px] h-32 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform "
        >
          <div className="flex justify-center items-center gap-2">

            <div className="">

              {/* <FileText className="w-12 h-12 text-gray-600" /> */}
              <img src="https://mariyojana.gujarat.gov.in/Images/img/search-icon/1.png" alt="" />
            </div>
            <div>

              <h3 className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
                {title}
              </h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Cards;
