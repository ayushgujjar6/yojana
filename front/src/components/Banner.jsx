import React, { useState, useEffect } from 'react';

const images = [
    'https://mariyojana.gujarat.gov.in/Images/img/header/header-img2.png',
    'https://mariyojana.gujarat.gov.in/Images/img/header/header-img1.png',
];

const BannerImage = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full relative mt-20" style={{ height: '410px' }}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(https://mariyojana.gujarat.gov.in/Images/img/home-header-bg3.png)`,
                }}
            >
                {/* Semi-transparent overlay for readability */}
                <div className="absolute inset-0 bg-white opacity-10"></div>
            </div>

            {/* Image Slider (Left Side) */}
            <div className="absolute top-0 left-0 flex items-center h-full w-1/3 p-4">
                <img
                    src={images[currentImage]}
                    alt="Changing Image"
                    className="object-contain max-w-md h-96 transition-opacity duration-700 ease-in-out"
                />
            </div>

            {/* Static Image (Right Side) */}
            <div className="absolute bottom-0 right-0 flex justify-end items-end h-96 ">
                <img
                    src="https://mariyojana.gujarat.gov.in/Images/img/pmcm.png"
                    alt="Static Image"
                    className="w-[640px] h-[346px]"
                />
            </div>

            {/* Text Overlay */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/4 -translate-y-1/4 w-[65%] text-right">
                <h2 className="text-3xl font-bold text-[#1F2A44] leading-snug">
                    Providing the <span className="text-[#E57C23]">benefits of Government Schemes</span> 
                    promptly to every citizen of the state is our <span className="text-[#E57C23]">priority.</span>
                </h2>
                <p className="text-right text-xl text-[#1F2A44] italic mt-2">
                    – Hon. Chief Minister Shri Bhupendra Patel
                </p>
            </div>
        </div>
    );
};

export default BannerImage;

