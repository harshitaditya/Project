import Smalldiv from "./Smalldiv";
import loginimg from "../Images/loginimg.png";
import Loginbutton from "./Loginbutton";
import Loginstatus from "./Loginstatus";
import { useActionState, useState } from "react";
import Forgotpassword from "./Forgotpassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const LoginPage = () => {
  const [showpassword,setshowpassword]=useState(false);
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
      console.log("Response Status ", res.status); //this is for check status of response
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
          height: "80px",
          zIndex: "1000",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl p-3 sm:p-5 font-bold text-white">
          Login
        </h1>
        <Smalldiv text="Register" />
      </div>

      <div className="bg-[#135887] fixed inset-0 min-h-screen pt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center px-4 sm:px-6 lg:px-10">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={loginimg}
            alt="login_image"
            className="max-w-full max-h-[80vh]"
          />
        </div>

        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2 pt-2 sm:pt-10 lg:pt-15">
            Hello Again!
          </h1>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-center text-gray-600 mb-6 lg:mb-10">
            Welcome Back you've been missed!
          </h3>

          <form action={formAction} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-medium text-base sm:text-xl lg:text-xl"
              />
            </div>

            <div  className="relative">
              <input
                type={showpassword?"text":"password"}
                name="password"
                placeholder="Password"
                className="h-10 sm:h-11 lg:h-12 w-full px-3 sm:px-4 py-2 border border-gray-300 sm:border-gray-600 lg:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium sm:font-medium text-base sm:text-xl lg:text-xl"
              />
              <button 
              type="button"
              onClick={()=>setshowpassword(!showpassword)}
              className="absolute right-3 top-4 -translate-y-0.5 text-gray-600 cursor-pointer text-2xl"
              >
                {showpassword?<FaEyeSlash/>:<FaEye/>}

              </button>
             
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleforgotpass}
                className="text-blue-500 text-base sm:text-lg lg:text-xl cursor-pointer underline font-bold"
              >
                Forgot Password
              </button>
            </div>

            <Loginbutton />
            {loginstate && ( //here We use Shortcircuit to show the data
              <p
                className={`font-bold text-center mt-2 ${
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
