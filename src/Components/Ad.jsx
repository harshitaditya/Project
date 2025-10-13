import { useEffect, useState } from "react";
import { BadgeCheck, CirclePercent, CreditCard, Truck } from "lucide-react";

const Ad = () => {
  const images = ["Image1", "Image2", "Image3", "Image4"];
  const [currentimage, setcurrentimage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentimage((prev) => (prev == images.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <>
      <div className="w-full">
        <div className="h-64 rounded-lg overflow-hidden bg-yellow-200">
          {/* <img
            src={images[currentimage]}
            alt="ad_images"
            className="w-full h-full object-cover"
          /> */}
          <h1>{images[currentimage]}</h1>
        </div>
      </div>

      <div className="bg-white w-full grid lg:grid-cols-4 grid-cols-2 gap-7 mt-6 p-6  ">
  
       <div className="flex items-center space-x-2">
          <BadgeCheck className="text-[#106299] lg:w-10 lg:h-10 sm:w-7 sm:h-7" />
          <span className="text-gray-800 font-semibold text-sm lg:text-base">
            100% Authentic Product
          </span>
        </div> 
        <div className="flex items-center space-x-2">
          <CirclePercent className="text-[#106299] lg:w-10 lg:h-10 sm:w-7 sm:h-7" />
          <span className="text-gray-800 font-semibold text-sm lg:text-base">
            Best Price Guarantee
          </span>
        </div> 
        <div className="flex items-center space-x-2">
          <CreditCard className="text-[#106299] lg:w-10 lg:h-10 sm:w-7 sm:h-7" />
          <span className="text-gray-800 font-semibold text-sm lg:text-base">
            EMI Option Available
          </span>
        </div> 
         <div className="flex items-center space-x-2">
           <Truck className="text-[#106299] lg:w-10 lg:h-10 sm:w-7 sm:h-7" />
          <span className="text-gray-800 font-semibold text-sm lg:text-base">
            On-time Delivery
          </span>
        </div> 
      </div>
    </>
  );
}
export default Ad;
