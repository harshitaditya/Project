import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Productspage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});
  
  // Get category from URL
  const categoryId = searchParams.get('category');
  const categoryName = searchParams.get('name');
  
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  

  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [brandsMap, setBrandsMap] = useState({});

  const userId = localStorage.getItem("userId");

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://fuertehealthcare.onrender.com/api/brands");
        const data = await res.json();
        // console.log("Response: ", data);
        const brandsArray= data.brands||[];   // when Api works -> []  or data.brands->null. 
        
       const brandMapping = {};
    brandsArray.forEach(brand => {
      brandMapping[brand._id] = brand.name;
    });
        
        setBrandsMap(brandMapping);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fuertehealthcare.onrender.com/api/items");
        const data = await res.json();
        // console.log("Response: ",data);
        
        let itemsArray = data.data || [];
        
        setItems(itemsArray);
        
        // Extract unique brand IDs and types
        const brandIds = [...new Set(itemsArray.map(item => item.brand).filter(Boolean))];
        const types = [...new Set(itemsArray.map(item => item.type).filter(Boolean))];
        
        setAvailableBrands(brandIds);
        setAvailableTypes(types);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters whenever items, filters, or categoryId changes
  useEffect(() => {
    applyFilters();
  }, [items, searchQuery, priceRange, selectedBrands, selectedTypes, categoryId]);

  
  const applyFilters = () => {
    let filtered = [...items];

    // Category filter (if coming from category page)
    if (categoryId) {
      filtered = filtered.filter((item) => 
        item.category === categoryId || 
        item.categoryId === categoryId ||
        item.category?._id === categoryId
      );
    }

    
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    filtered = filtered.filter((item) => {
      const price = item.sellingPrice || item.price || 0;
      return price >= Number(priceRange.min) && price <= Number(priceRange.max);
    });

    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((item) =>
        selectedBrands.includes(item.brand)
      );
    }

   
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTypes.includes(item.type)
      );
    }

    setFilteredItems(filtered);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewDetails = (item) => {
    navigate(`/product/${item.slug}`);

  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((b) => b !== brandId)
        : [...prev, brandId]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: 100000 });
    setSelectedBrands([]);
    setSelectedTypes([]);
    // Clear category filter by navigating to products page without params
    navigate('/Productspage');
  };

  const addToGuestCart = (item) => {
    try {
      const guestCart = localStorage.getItem("guestCart");
      let cartItems = guestCart ? JSON.parse(guestCart) : [];

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
        await addToUserCart(item);
      } else {
        addToGuestCart(item);
      }
    } finally {
      setAddingToCart({ ...addingToCart, [item._id]: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {categoryName && (
        <div className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                <p className="text-sm text-gray-600 mt-1">Browse products in this category</p>
              </div>
              <button
                onClick={() => navigate('/Productspage')}
                className="text-teal-700 hover:text-teal-800 font-semibold"
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="border-b py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-teal-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {(selectedBrands.length + selectedTypes.length + (categoryId ? 1 : 0)) > 0 && (
                <span className="bg-white text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  {selectedBrands.length + selectedTypes.length + (categoryId ? 1 : 0)}
                </span>
              )}
            </button>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleSearch}
                className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-teal-700 hover:text-teal-800 font-semibold"
                  >
                    Reset
                  </button>
                </div>

                {/* Active Category Filter */}
                {categoryId && categoryName && (
                  <div className="mb-6 p-3 bg-teal-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Category</p>
                        <p className="font-semibold text-sm text-teal-800">{categoryName}</p>
                      </div>
                      <button
                        onClick={() => navigate('/Productspage')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Price Range</h4>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    ₹{Number(priceRange.min).toLocaleString()} - ₹{Number(priceRange.max).toLocaleString()}
                  </p>
                </div>

                {/* Brand Filter */}
                {availableBrands.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Brand</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableBrands.map((brandId) => (
                        <label key={brandId} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-teal-700 focus:ring-teal-500"
                            checked={selectedBrands.includes(brandId)}
                            onChange={() => handleBrandChange(brandId)}
                          />
                          <span className="text-sm">
                            {brandsMap[brandId] || brandId}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Type Filter */}
                {availableTypes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Type</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-teal-700 focus:ring-teal-500"
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredItems.length} of {items.length} products
                {categoryName && ` in ${categoryName}`}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Products...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative h-64 bg-gray-100">
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/300x300?text=No+Image"}
                        alt={item.name || "Product"}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                      {item.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.discount}% off
                        </div>
                      )}
                      {item.bestSelling && (
                        <div className="absolute top-2 left-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Best Seller
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
                        {item.name || "Product Name"}
                      </h3>

                      {item.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.sellingPrice?.toLocaleString() || item.price?.toLocaleString() || "0"}
                        </span>
                        {item.price && item.sellingPrice && item.price > item.sellingPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="flex-1 bg-white border-2 border-teal-700 text-teal-700 py-2 px-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(item)}
                          disabled={addingToCart[item._id]}
                          className="flex-1 bg-teal-700 text-white py-2 px-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingToCart[item._id] ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg">
                <p className="text-gray-600 text-lg">No products found{categoryName && ` in ${categoryName}`}</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-teal-700 hover:text-teal-800 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productspage;