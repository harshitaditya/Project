import { useState, useEffect } from "react";
import { Star, MapPin, Phone, ChevronRight, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import Navbar from "./Navbar";

const Productdetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          "https://fuertehealthcare.onrender.com/api/items"
        );
        const data = await res.json();

        console.log("API Response:", data);

        let itemsArray = data.data || data.items || data.products || [];
        const selectedProduct = itemsArray.find(
          (item) => item._id === productId
        );

        console.log("Selected Product:", selectedProduct);
        setProduct(selectedProduct);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBack = () => {
    navigate(-1);
  };

  // Add to cart for guest users 
  const addToGuestCart = (item) => {
    try {
      const guestCart = localStorage.getItem("guestCart");
      let cartItems = guestCart ? JSON.parse(guestCart) : [];

      // Check if item already exists
      const existingItemIndex = cartItems.findIndex(
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

  // Add to cart for logged-in users (API)
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

  const addToCart = async () => {
    if (!product) return;

    setAddingToCart(true);

    try {
      if (userId) {
        // add to cart for loggedin user
        await addToUserCart(product);
      } else {
        // add to cart for guest user
        addToGuestCart(product);
      }
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Product Details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Product not found</p>
            <button
              onClick={handleBack}
              className="text-teal-700 hover:text-teal-800 font-semibold"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const images = product.images || [];
  const rating = product.rating || 4.7;
  const discount = product.discount || 5;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Images */}
            <div className="bg-white rounded-lg p-6">
              <div
                className="bg-gray-100 rounded-lg mb-4 flex items-center justify-center"
                style={{ minHeight: "400px" }}
              >
                <img
                  src={
                    images[currentImage] ||
                    "https://via.placeholder.com/500x500?text=No+Image"
                  }
                  alt={product.name}
                  className="max-h-96 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500x500?text=No+Image";
                  }}
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`border-2 rounded-lg p-2 flex-shrink-0 ${
                        currentImage === index
                          ? "border-teal-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-contain"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x100?text=No+Image";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              <div className="bg-white rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(rating)
                            ? "fill-orange-400 text-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">
                    {rating} / 5.0
                  </span>
                </div>

                {product.about && (
                  <p className="text-gray-600 mb-4">
                    {showFullDescription
                      ? product.about
                      : `${product.about.substring(0, 150)}${
                          product.about.length > 150 ? "......" : ""
                        }`}
                    {product.about.length > 150 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="text-blue-600 hover:text-blue-700 ml-1 font-semibold"
                      >
                        {showFullDescription ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.sellingPrice?.toLocaleString()}
                  </span>
                  {product.price && product.price > product.sellingPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {discount}% off
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg mb-6">
                  <span className="text-2xl font-bold">₹</span>
                  <div>
                    <div className="font-semibold">Lowest Price</div>
                    <div className="text-sm">Guaranted</div>
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full bg-teal-700 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-800 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? "Adding to Cart..." : "Add To Cart"}
                </button>

                <div>
                  <h3 className="text-xl font-bold mb-4">Benefits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-2">🤝</div>
                      <div className="font-semibold text-gray-900">
                        Best Price
                      </div>
                      <div className="text-sm text-gray-600">Guaranteed</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-2">💳</div>
                      <div className="font-semibold text-gray-900">
                        EMI Option
                      </div>
                      <div className="text-sm text-gray-600">Available</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-2">🚚</div>
                      <div className="font-semibold text-gray-900">On Time</div>
                      <div className="text-sm text-gray-600">Delivery</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-2">⚙️</div>
                      <div className="font-semibold text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">
                        Authentic products
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Informatian */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="w-6 h-6 text-gray-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Rajkot</h3>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-teal-100 p-3 rounded flex-shrink-0">
                    <div className="text-teal-700 font-bold text-sm">
                      SURGI
                    </div>
                    <div className="text-teal-700 text-xs">SELECT</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Surgi Select
                    </h4>
                    <p className="text-gray-600 text-sm mb-1">
                      The Spire - 405 150 Feet
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      Ring Road, Rajkot, Gujarat
                    </p>
                    <p className="text-gray-600 text-sm">
                      GST: 24AAFCF5296B1ZS
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    +916383238366
                  </span>
                </div>
                <button className="flex items-center gap-2 text-green-600 font-semibold border-2 border-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                  Contact Supplier
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.about || "Product details not available."}
            </p>
          </div>

          {/* Specifications Section */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Specifications</h2>
            <div className="space-y-4">
              {product.type && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">Type</div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.type}
                  </div>
                </div>
              )}
              {product.bestSelling !== undefined && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">
                    Best Seller
                  </div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.bestSelling ? "Yes" : "---"}
                  </div>
                </div>
              )}
              {discount > 0 && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">
                    Discount
                  </div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {discount}%
                  </div>
                </div>
              )}
              {product.color && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">Color</div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.color}
                  </div>
                </div>
              )}
              {product.size && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">Size</div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.size}
                  </div>
                </div>
              )}
              {product.feature && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">Feature</div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.feature}
                  </div>
                </div>
              )}
              {product.quantity && (
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-1/3 text-gray-600 font-medium">
                    Available Quantity
                  </div>
                  <div className="w-2/3 text-gray-900 font-semibold">
                    {product.quantity} units
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productdetail;