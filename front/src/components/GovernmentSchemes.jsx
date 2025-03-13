import React from "react";

function GovernmentSchemes() {
  return (
    <div className="flex items-center justify-between p-10 bg-gray-100">
      {/* Left Side - Text Content */}
      <div className="w-1/2">
        <h4 className="text-orange-600 font-semibold">About Mari Yojana Portal</h4>
        <h2 className="text-4xl font-bold text-[#162F56] mt-2">Discover All Schemes</h2>
        <p className="text-black mt-4">
          The "Bharat Schemes" portal is a user-friendly digital platform providing primary
          information about various government public welfare schemes on a single digital platform.
          It aims to make it easy and convenient for citizens to access information about the
          government benefits available to them.
        </p>
      </div>

      {/* Right Side - Video */}
      <div className="w-1/2">
        {/* <video src="/video/videoplayback.mp4"></video> */}
        <video
          className="w-full rounded-lg shadow-lg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sRAE04-TI8I"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
}

export default GovernmentSchemes;
