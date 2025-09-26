const Verifyotp = async (prevState, formdata) => {
  const otp = formdata.get("otp");
  const email = prevState?.email;

  if (!otp) {
    return { status: "error", message: "OTP is required",email};
  }
  if(!email){
    return{status:"error",message:"Email is required"}
  }

  try {
    const res = await fetch(
      "https://fuertehealthcare.onrender.com/api/user/verifyOtp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      }
    );
    if (!res.ok) {
      return { status: "error", message: "OTP verification failed" };
    }
    return {
      status: "success",
      message: "Otp Verified Successfully",
      email
    };
  } catch (err) {
    return { status: "error", message: "Network error", email };
  }
};
export default Verifyotp;
