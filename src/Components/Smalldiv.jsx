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
          "m-2 sm:m-3 lg:m-4 mr-4 sm:mr-5 lg:mr-6  w-40 sm:w-44 lg:w-48 h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center cursor-pointer bg-white border border-[#89CFF3] hover:bg-gray-100 hover:border-none transition-all duration-300 ease-in-out"
        }
        onClick={handleclick}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <h3 className="text-2xl m-0 p-0 font-semibold text-[rgb(51,150,211)] items-center ">
          {" "}
          {text}{" "}
        </h3>{" "}
      </button>
    </>
  );
};
export default Smalldiv;
