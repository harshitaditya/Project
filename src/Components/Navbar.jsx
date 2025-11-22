import { Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const Navbar = () => {
  const [showsearch, setshowsearch] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-15 p-5 bg-white shadow-xl">
          <Link to="/">
          <img
            src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262395/logo3_xmt7zu.png"
            className="h-12 w-30  sm:text-lg md:text-xl lg:text-2xl font-bold text-white"
          />
          </Link>
          <div className="flex gap-12">
            <div className="flex items-center space-x-3">
              {showsearch ? (
                <>
                
                  <input
                    type="text"
                    placeholder="Search Products"
                    className="border border-gray-700 rounded-full p-2 pl-4 font-medium w-80 hidden sm:block"
                  />
                   <Search className="w-8 h-8 text-gray-700 cursor-pointer hidden sm:block" />
              
                  <X
                    className="w-8 h-8 text-gray-700 cursor-pointer hidden sm:block"
                    onClick={() => setshowsearch(false)}
                  />
                </>
              ) : (
                 <Search
            className="w-8 h-8 text-gray-700 cursor-pointer hidden sm:block"
            onClick={() => setshowsearch(true)}
          />
              )}
            </div>

            <Link to="/cart">
              <ShoppingCart className="lg:h-8 lg:w-8 md:h-6 md:w-6 sm:h-4 sm:w-4 cursor-pointer hover:text-blue-100" />
            </Link>
            <Link to="/register">
              <User className="lg:h-8 lg:w-8 md:h-6 md:w-6 sm:h-4 sm:w-4 cursor-pointer hover:text-blue-100" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
