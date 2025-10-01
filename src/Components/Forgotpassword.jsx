import { useActionState } from "react";
import forgotimg from "../Images/loginimg.png";
const Forgotpassword = ({ onBack }) => {
  const handleforgotpassword = async (prevState, formdata) => {
    const email = formdata.get("email");

    if (!email) {
      return {
        status: "error",
        message: "Enter Email to Reset your Password",
      };
    }
    try {
      console.log("Useremail: ", email);
      const res = await fetch(
        "https://fuertehealthcare.onrender.com/api/user/sendOtp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      console.log("Response ", data);
      if (!res.ok) {
        if (res.status === 404) {
          return {
            status: "error",
            message: "Account not Found. Please register yourself",
          };
        }

        return {
          status: "error",
          message: data.message || `Login failed ${res.status}`,
        };
      }
      return {
        status: "success",
        message: `Otp Send to your mail ${email}`,
      };
    } catch (err) {
      return { status: "error", message: "Network Error" };
    }
  };

  const [statesend, formAction, ispending] = useActionState(
    handleforgotpassword,
    null
  );
  return (
    <>
      <div className="bg-[#135887]">
        <h1 className="text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white pt-5">
          Forgot Password
        </h1>
      </div>
      <div className="bg-[#135887]  min-h-screen pt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center px-4 sm:px-6 lg:px-10">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={forgotimg}
            alt="forgot_img"
            className="max-w-full max-h-[80vh]"
          />
        </div>

        <div className="bg-white p-4 sm:p-6 lg:p-6 rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto lg:mx-0 h-96">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-1 pt-1 sm:pt-5 lg:pt-10">
            Lets Help You out!
          </h1>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-center text-gray-600 mb-6 lg:mb-8">
            Enter Your Email to Reset Your Password
          </h3>

          <form action={formAction} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-medium text-base sm:text-lg lg:text-xl mb-5"
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              {statesend && (
                <p
                  className={`text-center font-bold text-lg w-full ${
                    statesend.status === "error"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {statesend.message}
                </p>
              )}
              <div className="flex gap-4">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="cursor-pointer bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-bold text-lg sm:text-lg lg:text-xl"
                  >
                    Back to Login
                  </button>
                )}
                <button
                  type="submit"
                  disabled={ispending}
                  className={`cursor-pointer bg-[#3396D3] text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg transition-colors duration-200 font-bold text-lg sm:text-lg lg:text-xl ${
                    ispending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600 hover:scale-105 transform"
                  }`}
                >
                  {ispending ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Forgotpassword;
