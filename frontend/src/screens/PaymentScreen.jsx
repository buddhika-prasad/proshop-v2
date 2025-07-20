import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaArrowRight } from "react-icons/fa";

import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Method
            </h1>
            <p className="text-gray-600">
              Select your preferred payment method
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={paymentMethod === "Credit Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="creditCard"
                  className="ml-3 flex items-center space-x-3 cursor-pointer"
                >
                  <FaCreditCard className="text-blue-600 text-xl" />
                  <span className="text-lg font-medium text-gray-900">
                    Credit Card
                  </span>
                </label>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
