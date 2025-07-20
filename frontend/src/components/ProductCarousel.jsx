import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Static product data
const products = [
  {
    _id: "1",
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    price: 89.99,
  },
  {
    _id: "2",
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    price: 599.99,
  },
  {
    _id: "3",
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    price: 929.99,
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-8 relative">
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden shadow-lg">
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative h-80 overflow-hidden">
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Link to={`/`} className="block h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                    <h6 className="text-lg font-medium m-0">
                      {product.name}{" "}
                      <span className="text-yellow-400">
                        (${product.price})
                      </span>
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
