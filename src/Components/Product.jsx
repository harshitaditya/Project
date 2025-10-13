import { useState, useEffect } from "react";

const Product = ({ text, item }) => {
    const [currentitem, setcurrentitem] = useState(0);
    
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentitem((prev) => (prev == item.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [item.length]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-6 bg-white w-full">
        <h2 className="mt-4 font-semibold lg:text-2xl sm:text-xl ">{text}</h2>

        <h1>{item[currentitem]}</h1>
      </div>
    </>
  );
};
export default Product;
