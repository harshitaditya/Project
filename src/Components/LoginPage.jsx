import Smalldiv from "./Smalldiv";
import loginimg from "../Images/loginimg.png";
import Loginbutton from "./Loginbutton";
import Loginstatus from "./Loginstatus";
import { useActionState, useState } from "react";
import Forgotpassword from "./Forgotpassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showpassword, setshowpassword] = useState(false);
  const handlelogin = async (prevState, formdata) => {
    if (formdata.get("email") === "" || formdata.get("password") === "") {
      return {
        status: "error",
        message: "Please Enter the details",
      };
    }
    const email = formdata.get("email");
    const password = formdata.get("password");
    try {
      console.log("Attempting login for: ", email);
      const res = await fetch(
        "https://fuertehealthcare.onrender.com/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log("Response Status ", res.status);
      const data = await res.json();
      console.log("Response data: ", data);
      if (!res.ok) {
        switch (res.status) {
          case 404:
            return {
              status: "error",
              message: "Account not Found. Please register yourself",
            };
          case 401:
            return {
              status: "error",
              message: "Invalid password",
            };
          default:
            return {
              status: "error",
              message: data.message || `Login failed ${res.status}`,
            };
        }
      }
      return {
        status: "success",
        message: "Login Successfully",
        email,
      };
    } catch (err) {
      return { status: "error", message: "Network Error" };
    }
  };
  const [loginstate, formAction] = useActionState(handlelogin, null);
  const [showforgotpassword, setshowforgotpassword] = useState(false);

  const handleforgotpass = (e) => {
    e.preventDefault();
    setshowforgotpassword(true);
  };
  if (showforgotpassword) {
    return <Forgotpassword onBack={() => setshowforgotpassword(false)} />;
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "#135887",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "56px",
          zIndex: "1000",
        }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl p-2 sm:p-3 font-bold text-white">
          Login
        </h1>
        <Smalldiv text="Register" />
      </div>

      <div className="bg-[#135887] fixed inset-0 min-h-screen pt-14 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 items-center px-3 sm:px-4 lg:px-7">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={loginimg}
            alt="login_image"
            className="max-w-full max-h-[80vh]"
          />
        </div>

        <div className="bg-white p-3 sm:p-4 lg:p-5 rounded-md w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:mx-0">
          <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-center text-gray-800 mb-1.5 pt-1.5 sm:pt-7 lg:pt-10">
            Hello Again!
          </h1>
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-center text-gray-600 mb-4 lg:mb-7">
            Welcome Back you've been missed!
          </h3>

          <form action={formAction} className="space-y-3">
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

            <div className="flex justify-end">
              <button
                onClick={handleforgotpass}
                className="text-blue-500 text-sm sm:text-base lg:text-lg cursor-pointer underline font-bold"
              >
                Forgot Password
              </button>
            </div>

            <Loginbutton />
            {loginstate && (
              <p
                className={`font-bold text-center mt-1.5 text-sm sm:text-base ${
                  loginstate.status === "error"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {loginstate.message}
              </p>
            )}
            <Loginstatus />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
