// ImageCarousel.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageCarousel() {
  const images = [
    {
      src: "/assets/images/Top_5_Zip_codes_electric_2013-2024.png",
      alt: "Top 5 Electric ZIP Codes (2013–2024)",
    },
    {
      src: "/assets/images/Top_5_Zip_codes_gas_2020-2024.png",
      alt: "Top 5 Gas ZIP Codes (2020–2024)",
    },
    {
      src: "/assets/images/94043_AllClasses_TotalkWh_vs_Customers_20250521_2035.png",
      alt: "ZIP 94043 kWh vs Customers",
    },
    {
      src: "/assets/images/94560_AllClasses_TotalkWh_vs_Customers_20250521_2037.png",
      alt: "ZIP 94560 kWh vs Customers",
    },
    {
      src: "/assets/images/95687_AllClasses_TotalkWh_vs_Customers_20250521_2038.png",
      alt: "ZIP 95687 kWh vs Customers",
    },
    {
      src: "/assets/images/95603_AllClasses_TotalkWh_vs_Customers_20250521_2046.png",
      alt: "ZIP 95603 kWh vs Customers",
    },
    {
      src: "/assets/images/96080_AllClasses_TotalkWh_vs_Customers_20250521_2040.png",
      alt: "ZIP 96080 kWh vs Customers",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pt-6">
      <Carousel
        autoPlay
        interval={6000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        stopOnHover={true}
        swipeable
        emulateTouch
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li
              className={`inline-block w-3 h-3 mx-1 rounded-full cursor-pointer ${
                isSelected ? "bg-signal-cyan" : "bg-gray-500"
              }`}
              onClick={onClickHandler}
              key={index}
              role="button"
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-lg shadow-md max-h-[600px] object-contain"
            />
            <p className="mt-2 mb-6 text-white text-sm text-center">{img.alt}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
