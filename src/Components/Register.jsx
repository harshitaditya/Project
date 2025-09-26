import Smalldiv from "./Smalldiv";
import registerimg from "../Images/registerimg.png";
import { useActionState } from "react";
import Sendotpform from "./Sendotpform";
import Verifyotpform from "./Verifyotpform";
import Sendotp from "./Sendotp";
import Verifyotp from "./Verifyotp";

const Register = () => {
  const [statesend, sendotpAction] = useActionState(Sendotp, null);
  const [verifystate, verifyotpAction] = useActionState(Verifyotp, null);

  const otpsent = statesend?.status === "success" || verifystate?.email;

  return (
    <>
      <div
        style={{
          backgroundColor: "#106299",
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
          Register
        </h1>
        <Smalldiv text="Login" />
      </div>

      <div className="bg-[#106299] min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={registerimg}
            alt="registration_image"
            className="max-w-full max-h-[80vh]"
          />
        </div>

        <div className="flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
            {!otpsent ? (
              <Sendotpform
                sendotpAction={sendotpAction}
                statesend={statesend}
              />
            ) : (
              <Verifyotpform
                verifyotpAction={verifyotpAction}
                verifystate={verifystate}
                email={statesend?.email || verifystate?.email}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
