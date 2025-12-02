import { useEffect, useState } from "react";
import { BadgeCheck, CirclePercent, CreditCard, Truck, ChevronLeft, ChevronRight } from "lucide-react";

import Ad1 from "../Images/Ad_image1.png";
import Ad2 from "../Images/Ad_image2.png";
import Ad3 from "../Images/Ad_image3.png";
import Ad4 from "../Images/Ad_image4.png";

const Ad = () => {
  const images = [Ad1, Ad2, Ad3, Ad4];
  
  const [currentimage, setcurrentimage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentimage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setcurrentimage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setcurrentimage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Image Slider - Hidden on mobile (sm and below), visible on tablet and above */}
      <div className="hidden md:block relative w-full h-[300px] lg:h-[380px] overflow-hidden bg-gradient-to-r from-blue-900 to-cyan-500 rounded-lg">
        <img
          src={images[currentimage]}
          alt="Ad Slider"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x380?text=Advertisement";
          }}
        />

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setcurrentimage(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentimage
                  ? "bg-cyan-400 w-5 h-2"
                  : "bg-white/60 hover:bg-white/80 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Features Grid - Always visible */}
      <div className="bg-white w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-5 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-[#106299]/10 p-2 rounded-full flex-shrink-0">
              <BadgeCheck className="text-[#106299] w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <span className="text-gray-800 font-semibold text-sm lg:text-base">
              100% Authentic Products
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-[#106299]/10 p-2 rounded-full flex-shrink-0">
              <CirclePercent className="text-[#106299] w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <span className="text-gray-800 font-semibold text-sm lg:text-base">
              Best Price Guarantee
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-[#106299]/10 p-2 rounded-full flex-shrink-0">
              <CreditCard className="text-[#106299] w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <span className="text-gray-800 font-semibold text-sm lg:text-base">
              EMI Option Available
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-[#106299]/10 p-2 rounded-full flex-shrink-0">
              <Truck className="text-[#106299] w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <span className="text-gray-800 font-semibold text-sm lg:text-base">
              On-time Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;