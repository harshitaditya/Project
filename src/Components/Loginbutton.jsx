import { useFormStatus } from "react-dom";

const Loginbutton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center">
    <button
      type="submit"
      disabled={pending}
      className={`w-40 py-3 rounded-lg font-bold cursor-pointer lg:text-lg  sm:text-xl ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#3396D3] hover:bg-blue-600 text-white"
      }`}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
          Logging in...
        </div>
      ) : (
        "Login"
      )}
    </button>
    </div>
  );
};

export default Loginbutton;
