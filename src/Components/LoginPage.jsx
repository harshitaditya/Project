import Smalldiv from "./Smalldiv";
import loginimg from "../Images/loginimg.png"
const LoginPage = () => {
   

    return (
<>
<div style={{
    backgroundColor: "rgb(255, 255, 255)",
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    position: "fixed", 
    top: "0",
    left: "0",
    width: "100%",
    height: "80px",
    zIndex: "1000"
}}> 
    <h1 className="text-4xl p-5 font-bold text-[#00A9FF]">
        Login
    </h1>
    <Smalldiv text="Register"/>
</div>
    <div className="min-h-screen pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10">
         <div className="flex justify-center items-center">
            <img 
                src={loginimg} 
                alt="login_image"
                className="max-w-full max-h-[80vh]"
            />
        </div>
    <div className="bg-[#89CFF3] p-8 rounded-lg w-full max-w-2xl">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 pt-20">Hello Again!</h1>
    <h3 className="text-2xl font-medium text-center text-gray-600 mb-10">Welcome Back you've been missed! </h3>
    

    <form action="" className="space-y-4">
        <div>
        <input 
                    type="text" 
                    placeholder="Email"
                    className="h-12 w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-2xl"
                />
            </div>
                <div>
        <input 
                    type="password" 
                    placeholder="Password"
                    className="h-12 w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-2xl"
                />
            </div>
            <div className="flex justify-end">
                <button className="text-blue-500 underline font-bold">Forgot Password</button>
            </div>
                <div className="flex items-center justify-center">
            <button 
                className="cursor-pointer  bg-[#3396D3] text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-bold text-2xl transform hover:scale-105 mb-8">
                Login
            </button>
            </div> 
        
    </form>


        
        
    
    </div>
</div>

    </>
 )
    }
 export default LoginPage;