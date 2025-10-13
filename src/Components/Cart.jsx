import { Link } from "react-router";
import Navbar from "./Navbar";
import emptycart from "../Images/emptycart.png"

const Cart=()=>{
  return(
    <>
     <Navbar/>
     <div className="flex flex-col justify-center items-center min-h-screen -mt-10">
        <img src={emptycart} alt="empty_cart" className="w-120 h-auto " />
        <h1 className="sm:text-lg lg:text-xl font-medium mb-2">Your Shopping Cart is Empty!</h1>
        <Link to="/">
          <button className="border-2 border-solid h-10 w-60 rounded-full bg-[#106299] text-white text-lg font-medium cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </>
  )
}
export default Cart;