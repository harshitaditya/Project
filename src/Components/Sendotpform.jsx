import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Sendotpform = ({ statesend, sendotpAction }) => {
  const [phone, setphone] = useState("+91 ");
  const [showpassword, setshowpassword] = useState(false);

  const handlephone = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+91")) {
      value = "+91 ";
    }
    const digits = value.slice(3).replace(/\D/g, "");

    if (digits.length <= 10) {
      setphone("+91 " + digits);
    }
  };
  return (
    <>
      <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-center text-gray-800 mb-1.5">
        Welcome!
      </h2>
      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-center text-gray-600 mb-4 lg:mb-5">
        Create Your Account Below
      </h3>

      <form action={sendotpAction} className="space-y-3">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="h-7 sm:h-8 lg:h-9 w-full px-2 sm:px-3 py-1.5 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm sm:text-base lg:text-lg"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handlephone}
            placeholder="+91 xxxxxxxxxx"
            className="h-7 sm:h-8 lg:h-9 w-full px-2 sm:px-3 py-1.5 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm sm:text-base lg:text-lg"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="h-7 sm:h-8 lg:h-9 w-full px-2 sm:px-3 py-1.5 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm sm:text-base lg:text-lg"
          />
        </div>

        <div className="relative">
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="h-7 sm:h-8 lg:h-9 w-full px-2 sm:px-3 py-1.5 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm sm:text-base lg:text-lg"
          />
          <button
            type="button"
            onClick={() => setshowpassword(!showpassword)}
            className="absolute right-2 top-2.5 text-gray-600 cursor-pointer text-base sm:text-lg"
          >
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex items-center justify-center pt-1.5">
          <button className="cursor-pointer bg-[#3396D3] text-white py-1.5 sm:py-2 px-3 sm:px-4 lg:px-5 rounded-md hover:bg-blue-600 transition-colors duration-200 font-bold text-base sm:text-base lg:text-lg transform hover:scale-105">
            Send OTP
          </button>
        </div>
        {statesend ? (
          <p
            className={`mt-1.5 text-center font-bold text-sm sm:text-base ${
              statesend.status === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {statesend.message}
          </p>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

export default Sendotpform;
