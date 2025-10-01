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
          height: "56px",
          zIndex: "1000",
        }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl p-2 sm:p-3 font-bold text-white">
          Register
        </h1>
        <Smalldiv text="Login" />
      </div>

      <div className="bg-[#106299] fixed inset-0 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 items-center px-3 sm:px-4 lg:px-7 pt-14">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={registerimg}
            alt="registration_image"
            className="max-w-full max-h-[80vh]"
          />
        </div>

        <div className="flex justify-center items-center">
          <div className="bg-white rounded-md shadow-xl p-3 sm:p-4 lg:p-5 w-full max-w-sm sm:max-w-md lg:max-w-xl">
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