import { Link } from "react-router-dom";
import {
  FaSignInAlt,
  FaShippingFast,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Step 1 */}
        <div className="flex items-center">
          {step1 ? (
            <Link
              to="/login"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaSignInAlt className="text-lg" />
              <span className="font-medium">Sign In</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <FaSignInAlt className="text-lg" />
              <span className="font-medium">Sign In</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="text-gray-400">→</div>

        {/* Step 2 */}
        <div className="flex items-center">
          {step2 ? (
            <Link
              to="/shipping"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaShippingFast className="text-lg" />
              <span className="font-medium">Shipping</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <FaShippingFast className="text-lg" />
              <span className="font-medium">Shipping</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="text-gray-400">→</div>

        {/* Step 3 */}
        <div className="flex items-center">
          {step3 ? (
            <Link
              to="/payment"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaCreditCard className="text-lg" />
              <span className="font-medium">Payment</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <FaCreditCard className="text-lg" />
              <span className="font-medium">Payment</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="text-gray-400">→</div>

        {/* Step 4 */}
        <div className="flex items-center">
          {step4 ? (
            <Link
              to="/placeorder"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaCheckCircle className="text-lg" />
              <span className="font-medium">Place Order</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <FaCheckCircle className="text-lg" />
              <span className="font-medium">Place Order</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
