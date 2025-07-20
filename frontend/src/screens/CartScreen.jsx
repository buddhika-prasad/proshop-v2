import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Message>
                  Your cart is empty{" "}
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Go Back
                  </Link>
                </Message>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => removeFromCartHandler(item._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-all duration-200"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Subtotal (
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.qty || 0),
                      0
                    )}{" "}
                    items)
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + Number(item.qty || 0) * Number(item.price || 0),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Proceed To Checkout</span>
                  <FaArrowRight className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
