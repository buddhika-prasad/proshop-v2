import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceorderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  // ✅ Price calculations (no mutation)
  const itemsPrice = Number(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ).toFixed(2);

  const shippingPrice = Number(itemsPrice > 100 ? 0 : 10).toFixed(2);

  const taxPrice = Number(0.15 * itemsPrice).toFixed(2);

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Shipping</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaCreditCard className="text-green-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Method
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Method:</span>{" "}
                  {cart.paymentMethod}
                </p>
              </div>
            </div>

            {/* Order Items Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaShoppingCart className="text-purple-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Items
                </h2>
              </div>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item._id || item.product}`}
                          className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-gray-900 font-medium">
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center space-x-3 mb-6">
                <FaCheckCircle className="text-green-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">${itemsPrice}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingPrice}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${taxPrice}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${totalPrice}
                  </span>
                </div>

                {error && (
                  <div className="mt-4">
                    <Message variant="danger">{error}</Message>
                  </div>
                )}

                <button
                  type="button"
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderScreen;
