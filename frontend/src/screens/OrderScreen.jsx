import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
  FaLock,
  FaCalendar,
  FaUser,
} from "react-icons/fa";

import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("Please fill in all card details");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create payment details object
      const paymentDetails = {
        paymentMethod: "Credit Card",
        cardLast4: cardNumber.slice(-4),
        transactionId: `txn_${Date.now()}`,
        paidAt: new Date().toISOString(),
      };

      await payOrder({ orderId, details: paymentDetails });
      refetch();
      toast.success("Payment successful! Order is now paid.");

      // Clear form
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
    } catch (err) {
      toast.error(
        err?.data?.message || err.error || "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader />
    </div>
  ) : error ? (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Order {order._id}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Shipping</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {order.user ? order.user.name : "Unknown User"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {order.user && order.user.email ? (
                    <a
                      href={`mailto:${order.user.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {order.user.email}
                    </a>
                  ) : (
                    <span>No Email</span>
                  )}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="mt-4">
                {order.isDelivered ? (
                  <div className="flex items-center space-x-2 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <FaTruck className="text-green-600" />
                    <span>
                      Delivered on{" "}
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <FaTruck className="text-red-600" />
                    <span>Not Delivered</span>
                  </div>
                )}
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
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Method:</span>{" "}
                  {order.paymentMethod}
                </p>
              </div>
              <div className="mt-4">
                {order.isPaid ? (
                  <div className="flex items-center space-x-2 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <FaCheckCircle className="text-green-600" />
                    <span>
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <FaCreditCard className="text-red-600" />
                    <span>Not Paid</span>
                  </div>
                )}
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

              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => {
                    // Debug logging
                    console.log("Order item:", item);
                    console.log("Qty:", item.qty, "Price:", item.price);

                    // Ensure qty and price are valid numbers
                    const qty = parseInt(item.qty) || 0;
                    const price = parseFloat(item.price) || 0;
                    const total = qty * price;

                    return (
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
                            to={`/product/${item.product}`}
                            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-gray-900 font-medium">
                            {qty} x ${price.toFixed(2)} = ${total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
                  <span className="font-medium">
                    ${order.itemsPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ${order.shippingPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${order.taxPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Credit Card Payment Section */}
                {!order.isPaid && (
                  <div className="mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaLock className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Secure Payment
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Complete your payment with credit or debit card
                      </p>
                    </div>

                    <form onSubmit={handleCardPayment} className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          <FaCreditCard className="inline mr-2 text-gray-500" />
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          maxLength="19"
                          required
                        />
                      </div>

                      {/* Card Holder Name */}
                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          <FaUser className="inline mr-2 text-gray-500" />
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Expiry Date */}
                        <div>
                          <label
                            htmlFor="expiryDate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            <FaCalendar className="inline mr-2 text-gray-500" />
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) =>
                              setExpiryDate(formatExpiryDate(e.target.value))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            maxLength="5"
                            required
                          />
                        </div>

                        {/* CVV */}
                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            <FaLock className="inline mr-2 text-gray-500" />
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) =>
                              setCvv(e.target.value.replace(/\D/g, ""))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isProcessing || loadingPay}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        {isProcessing || loadingPay ? (
                          <>
                            <Loader />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <>
                            <FaCreditCard />
                            <span>Pay ${order.totalPrice.toFixed(2)}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* Admin Deliver Button */}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={deliverOrderHandler}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                      >
                        <FaTruck className="inline mr-2" />
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
