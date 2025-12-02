import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://fuertehealthcare.onrender.com/api/category/getAll"
        );
        const data = await res.json();

        console.log("Categories Response:", data);

        const categoriesArray = data.data || data || [];
        setCategories(categoriesArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (categories.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [categories.length, currentIndex]);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 5; // Large desktop: 5 items
      if (window.innerWidth >= 1024) return 4; // Desktop: 4 items
      if (window.innerWidth >= 768) return 3; // Tablet: 3 items
      return 2; // Mobile: 2 items
    }
    return 5;
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
      const index = (currentIndex + i) % categories.length;
      visible.push(categories[index]);
    }
    return visible;
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    window.location.href = `/Productspage?category=${categoryId}&name=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="w-full bg-gray-50 py-8 px-4  ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        </div>

       

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Categories...</p>
          </div>
        )}

        {!loading && categories.length > 0 && (
          <div className="relative">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors "
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <div className="overflow-hidden">
              <div className="flex gap-4 transition-transform duration-500 ease-in-out mb-5">
                {getVisibleItems().map((category, index) => (
                  <div
                    key={`${category._id}-${index}`}
                    onClick={() =>
                      handleCategoryClick(category._id, category.name)
                    }
                    className="flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * 1}rem) / ${visibleCount})`,
                    }}
                  >
                  
                    <div className="relative bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-8"
                         style={{ paddingBottom: '100%', position: 'relative' }}>
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <img
                          src={
                            category.image ||
                            "https://via.placeholder.com/200x200?text=Category"
                          }
                          alt={category.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x200?text=" +
                              (category.name || "Category");
                          }}
                        />
                        <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/10 transition-colors duration-300"></div>
                      </div>
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 flex items-center justify-center group-hover:text-teal-700 transition-colors">
                        {category.name || "Category"}
                      </h3>

                      <button className="mt-2 w-full bg-teal-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-xs">
                        Explore
                      </button>
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
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-teal-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">No categories available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;