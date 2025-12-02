import { useState, useEffect } from "react";
import { Link } from "react-router";

const Product = () => {
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState({});

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await fetch(
          "https://fuertehealthcare.onrender.com/api/items"
        );
        const data = await res.json();

        console.log("API Response:", data);
        console.log("Object keys:", Object.keys(data));

        let itemsArray = [];
        if (data.items) {
          itemsArray = data.items;
        } else if (data.data) {
          itemsArray = data.data;
        } else if (data.products) {
          itemsArray = data.products;
        }

        console.log("Items:", itemsArray);
        setitems(itemsArray);
        setloading(false);
      } catch (err) {
        console.log("Error:", err);
        setloading(false);
      }
    };
    fetchproduct();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length, currentIndex]);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push(items[index]);
    }
    return visible;
  };

  // Add to cart for guest users 
  const addToGuestCart = (item) => {
    try {
      const guestCart = localStorage.getItem("guestCart");
      let cartItems = guestCart ? JSON.parse(guestCart) : [];

     
      const existingItemIndex = cartItems.findIndex(  //check for already existing user
        (cartItem) => cartItem.item._id === item._id
      );

      if (existingItemIndex !== -1) {
      
        cartItems[existingItemIndex].qty += 1;
        cartItems[existingItemIndex].total =
          cartItems[existingItemIndex].price * cartItems[existingItemIndex].qty;
      } else {
        cartItems.push({
          item: item,
          qty: 1,
          price: item.sellingPrice || item.price,
          total: item.sellingPrice || item.price,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(cartItems));
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding to guest cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Add to cart for logged-in users through api
  const addToUserCart = async (item) => {
    try {
      const cartRes = await fetch(
        `https://fuertehealthcare.onrender.com/api/cart/user-cart/${userId}`
      );

      let existingItems = [];
      let finalTotal = 0;

      if (cartRes.ok) {
        const cartData = await cartRes.json();
        existingItems = cartData.items || [];
        finalTotal = cartData.finalTotal || 0;
      }

      const existingItemIndex = existingItems.findIndex(
        (cartItem) =>
          cartItem.item._id === item._id || cartItem.item === item._id
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = existingItems.map((cartItem, index) => {
          if (index === existingItemIndex) {
            const newQty = cartItem.qty + 1;
            return {
              item: item._id,
              qty: newQty,
              price: item.sellingPrice || item.price,
              total: (item.sellingPrice || item.price) * newQty,
            };
          }
          return {
            item: cartItem.item._id || cartItem.item,
            qty: cartItem.qty,
            price: cartItem.price,
            total: cartItem.total,
          };
        });
      } else {
        updatedItems = [
          ...existingItems.map((cartItem) => ({
            item: cartItem.item._id || cartItem.item,
            qty: cartItem.qty,
            price: cartItem.price,
            total: cartItem.total,
          })),
          {
            item: item._id,
            qty: 1,
            price: item.sellingPrice || item.price,
            total: item.sellingPrice || item.price,
          },
        ];
      }

      finalTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

      const method = existingItems.length > 0 ? "PUT" : "POST";
      const endpoint =
        existingItems.length > 0
          ? "https://fuertehealthcare.onrender.com/api/cart/update-cart"
          : "https://fuertehealthcare.onrender.com/api/cart/add-cart";

      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: updatedItems,
          finalTotal,
        }),
      });

      if (res.ok) {
        alert("Item added to cart successfully!");
      } else {
        const error = await res.json();
        alert(`Failed to add item: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const addToCart = async (item) => {
    setAddingToCart({ ...addingToCart, [item._id]: true });

    try {
      if (userId) {
       
        await addToUserCart(item);  //for already loggedin user
      } else {
        
        addToGuestCart(item);    // for guest user
      }
    } finally {
      setAddingToCart({ ...addingToCart, [item._id]: false });
    }
  };

  return (
    <div className="w-full bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
        </div>

        <div className="flex justify-end mb-8">
          <Link to="/Productspage">
            <button className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
              View all
            </button>
          </Link>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading Products.....</p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="relative">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div className="flex gap-6 transition-transform duration-500 ease-in-out mb-5">
                {getVisibleItems().map((item, index) => (
                  <div
                    key={`${item._id || item.name}-${index}`}
                    className="flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    style={{
                      width: `calc((100% - ${
                        (visibleCount - 1) * 1.5
                      }rem) / ${visibleCount})`,
                    }}
                  >
                    <div className="relative h-64 bg-gray-100">
                      <img
                        src={
                          item.images?.[0] ||
                          item.image ||
                          "https://via.placeholder.com/300x300?text=No+Image"
                        }
                        alt={item.name || "Product"}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                      {item.discount && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.discount}% off
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {item.name || "Product Name"}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          ₹ {item.price?.toLocaleString() || "0"}
                        </span>
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice?.toLocaleString()}
                            </span>
                          )}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/Productdetail/${item._id}`} className="flex-1">
                          <button className="w-full bg-white border-2 border-teal-600 text-teal-600 py-2 px-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors text-sm">
                            View Details
                          </button>
                        </Link>
                        <button
                          onClick={() => addToCart(item)}
                          disabled={addingToCart[item._id]}
                          className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingToCart[item._id] ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;