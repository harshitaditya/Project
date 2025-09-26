const Sendotp = async (prevState, formdata) => {
  const email = formdata.get("email");
  const phone= formdata.get("phone");
  const name=formdata.get("name");
  const password=formdata.get("password");
  if (!name || !phone || !email || !password) {
    return { status: "error", message: "All fields are required" };
  }
  if(password.length<6){
    return{status:"error", message:"Password Must contain at least 6 Characters"}
  }

  //this try catch checks email already exists or not.

   try {
    const checkemailres = await fetch(
      `https://fuertehealthcare.onrender.com/api/user/check-email?email=${encodeURIComponent(email)}`
    );
    
    if (checkemailres.ok) {
      const emailcheck = await checkemailres.json();
      if (emailcheck.exists) {
        return { 
          status: "error", 
          message: "Email already registered. Please login instead." 
        };
      }
    }
  } catch (err) {
    console.warn("Error ", err);
  }

  // this try catch use for send otp

  try {
    const res = await fetch(
      "https://fuertehealthcare.onrender.com/api/user/sendOtp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
   
    if (!res.ok) {
      return { status: "error", message: "Failed to send otp" };
    }
    return {
      status: "success",
      message: `OTP Sent Successfully to ${email}`,
      email,
    };
  } catch (err) {
    return {
      status: "error",
      message: "Network Error",
    };
  }
};
export default Sendotp;
