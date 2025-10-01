import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Smalldiv = ({ text }) => {
  const [hover, sethover] = useState(false);
  const navigate = useNavigate();
  const handleclick = () => {
    if (text === "Login") {
      navigate("/userlogin");
    } else if (text === "Register") {
      navigate("/register");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <button
        className={
          "m-1 sm:m-2 lg:m-3 mr-2 sm:mr-3 lg:mr-4 w-32 sm:w-36 lg:w-40 h-10 sm:h-11 lg:h-12 rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center cursor-pointer bg-white border border-[#89CFF3] hover:bg-gray-100 hover:border-none transition-all duration-300 ease-in-out"
        }
        onClick={handleclick}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[rgb(51,150,211)]">
          {text}
        </h3>
      </button>
    </>
  );
};
export default Smalldiv;