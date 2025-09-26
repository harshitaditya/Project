import { useFormStatus } from "react-dom";

const Loginstatus = () => {
  const { pending, data } = useFormStatus();
  console.log(pending); // here the logindetails Submitted and Pending become true->false

  if (pending) {
    return (
      <p className="text-blue-600 text-center animate-pulse">
        Authenticating {data?.get("email")}...
      </p>
    );
  }

  return null;
};
export default Loginstatus;
