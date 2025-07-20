import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300">
      <Link to={`/product/${product._id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-200"
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 product-title hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div className="mt-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
