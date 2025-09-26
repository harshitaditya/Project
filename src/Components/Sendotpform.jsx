const Sendotpform = ({ statesend, sendotpAction }) => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
        Welcome!
      </h2>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-center text-gray-600 mb-6 lg:mb-8">
        Create Your Account Below
      </h3>

      <form action={sendotpAction} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-bold text-base sm:text-lg lg:text-2xl"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-bold text-base sm:text-lg lg:text-2xl"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-bold text-base sm:text-lg lg:text-2xl"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-bold text-base sm:text-lg lg:text-2xl"
          />
        </div>

        <div className="flex items-center justify-center pt-2">
          <button className="cursor-pointer bg-[#3396D3] text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-bold text-lg sm:text-xl lg:text-2xl transform hover:scale-105">
            Send OTP
          </button>
        </div>
        {statesend ? (
          <p
            className={`mt-2 text-center font-bold ${
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
