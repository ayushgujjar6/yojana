import React from "react";
import Header from "./components/Header";
import BannerImage from "./components/Banner";
import Fixbottombutton from "./components/Fixbottombutton";
import SearchBox from "./components/SearchBox";
import Cards from "./components/Cards";
import SectorSchemes from "./components/SectorScheme";
import GovernmentSchemes from "./components/GovernmentSchemes"; // Updated import
import Explore from "./components/Explore";
import Logo from "./components/Logo";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <Header />
      <BannerImage />
      <Fixbottombutton />
      <SearchBox />
      <Cards />
      <SectorSchemes/>
      <GovernmentSchemes /> {/* Updated component name */}
      <Explore/>
      <Logo/>
      <Contact/>
    </div>
  );
}

export default App;


