import Smalldiv from "./Smalldiv";
import registerimg from "../Images/registerimg.png"

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };
    
    return (
<>
    
    <div style={{
        backgroundColor: "RGB(255, 255, 255)",
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
            Register
        </h1>
        <Smalldiv text="Login"/>
    </div>
    <div className=" bg-[RGB(255, 255, 255)] min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 pt-20" >
        <div className="flex justify-center items-center">
            <img 
                src={registerimg} 
                alt="registraion_image"
                className="max-w-full max-h-[80vh]"
            />
        </div>
          
        <div className="flex justify-center items-center">
            <div className="bg-[#89CFF3] rounded-lg shadow-xl p-8 w-full max-w-2xl">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Welcome!</h2>
                <h3 className="text-3xl font-medium text-center text-gray-600 mb-15">Create Your Account Below</h3>
            
    <div className="space-y-4">
        <div>
            <input 
                type="text" 
                placeholder="Name"
                className="h-12 w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-2xl"
            />
        </div>
        
        <div>
            <input 
                type="number" 
                placeholder="Phone Number"
                className="h-12 w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-2xl"
            />
        </div>
        
        <div>
            <input 
                type="email" 
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
        <div className="flex items-center justify-center">
        <button 
            onClick={handleSubmit}
            className="cursor-pointer  bg-[#3396D3] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-bold mt-4 mb-6 text-2xl transform hover:scale-105"
        >
            Send OTP
        </button>
        </div>
    </div>
        </div>
    </div>
</div>

    
</>
    )
}

export default Register;