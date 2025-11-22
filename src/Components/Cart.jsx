import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "./Navbar";
import emptycart from "../Images/emptycart.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchCartFromAPI();
    } else {
      fetchCartFromLocalStorage();
    }
  }, [userId]);

  // Fetch cart from API for logged-in users
  const fetchCartFromAPI = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://fuertehealthcare.onrender.com/api/cart/user-cart/${userId}`
      );
      const data = await res.json();
      console.log("Cart Data:", data);
      
      if (data && data.items) {
        setCartItems(data.items);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setLoading(false);
    }
  };

  // Fetch cart for non-logged-in users
  const fetchCartFromLocalStorage = () => {
    try {
      setLoading(true);
      const localCart = localStorage.getItem("guestCart");
      if (localCart) {
        const parsedCart = JSON.parse(localCart);
        setCartItems(parsedCart);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error loading cart from localStorage:", err);
      setLoading(false);
    }
  };

 
  const updateLocalStorageCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    
    try {
      setUpdating(true);

      if (userId) {
        // Update via API for logged-in users
        const updatedItems = cartItems.map((item) => {
          if (item.item._id === itemId) {
            return {
              ...item,
              qty: newQty,
              total: item.price * newQty,
            };
          }
          return item;
        });

        const finalTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

        const res = await fetch(
          "https://fuertehealthcare.onrender.com/api/cart/update-cart",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              items: updatedItems.map((item) => ({
                item: item.item._id,
                qty: item.qty,
                price: item.price,
                total: item.total,
              })),
              finalTotal,
            }),
          }
        );

        if (res.ok) {
          setCartItems(updatedItems);
        }
      } else {
        // Update for guest user
        const updatedItems = cartItems.map((item) => {
          if (item.item._id === itemId) {
            return {
              ...item,
              qty: newQty,
              total: item.price * newQty,
            };
          }
          return item;
        });
        setCartItems(updatedItems);
        updateLocalStorageCart(updatedItems);
      }

      setUpdating(false);
    } catch (err) {
      console.error("Error updating cart:", err);
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      if (userId) {
        // Remove via API for logged-in users
        const res = await fetch(
          `https://fuertehealthcare.onrender.com/api/cart/remove/${userId}/${itemId}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          const updatedItems = cartItems.filter((item) => item.item._id !== itemId);
          setCartItems(updatedItems);
        }
      } else {
        // Remove from localStorage for guest users
        const updatedItems = cartItems.filter((item) => item.item._id !== itemId);
        setCartItems(updatedItems);
        updateLocalStorageCart(updatedItems);
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleCheckout = () => {
    if (!userId) {
      alert("Please login to proceed with checkout");
      navigate("/userlogin"); // Redirect to login page
    } else {
      navigate(); // blank for payment component
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-gray-600">Loading cart...</p>
        </div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen -mt-10">
          <img src={emptycart} alt="empty_cart" className="w-120 h-auto" />
          <h1 className="sm:text-lg lg:text-xl font-medium mb-2">
            Your Shopping Cart is Empty!
          </h1>
          <Link to="/">
            <button className="border-2 border-solid h-10 w-60 rounded-full bg-[#106299] text-white text-lg font-medium cursor-pointer hover:bg-[#0d4f7a] transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {/* Guest User Warning */}
          {!userId && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    You are shopping as a guest. Please <Link to="/userlogin" className="font-semibold underline">login</Link> to proceed with checkout.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.item._id}
                  className="bg-white rounded-lg shadow-md p-6 flex gap-4"
                >
                  
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                    <img
                      src={
                        cartItem.item.images?.[0] ||
                        "https://via.placeholder.com/100x100?text=No+Image"
                      }
                      alt={cartItem.item.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x100?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cartItem.item.name}
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{cartItem.price?.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeItem(cartItem.item._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem.item._id, cartItem.qty - 1)
                        }
                        disabled={updating || cartItem.qty <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />  
                      </button>
                      <span className="px-4 font-semibold">{cartItem.qty}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cartItem.item._id, cartItem.qty + 1)
                        }
                        disabled={updating}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      ₹{cartItem.total?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link to="/">
                  <button className="w-full border-2 border-teal-700 text-teal-700 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;