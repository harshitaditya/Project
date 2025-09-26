const Verifyotpform = ({ verifystate, verifyotpAction }) => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-10">
        OTP Verification!
      </h2>

      <form action={verifyotpAction} className="space-y-4">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium sm:font-bold text-base sm:text-lg lg:text-2xl"
        />

        <div className="flex items-center justify-center pt-2">
          <button
            type="submit"
            className="cursor-pointer bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 font-bold text-lg sm:text-xl lg:text-2xl transform hover:scale-105"
          >
            Verify OTP
          </button>
        </div>
        {verifystate ? (
          <p
            className={`mt-2 text-center font-bold ${
              verifystate.status === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {verifystate.message}
          </p>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};
export default Verifyotpform;
