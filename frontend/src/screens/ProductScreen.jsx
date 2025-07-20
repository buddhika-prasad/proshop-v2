import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { FaArrowLeft, FaShoppingCart, FaUser } from "react-icons/fa";

export const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating: Number(rating),
        comment,
      }).unwrap();
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
        >
          <FaArrowLeft className="text-sm" />
          <span>Go Back</span>
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta title={product.name} />

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Product Image */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <div className="mb-4">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>

                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    ${product.price}
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-gray-900">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-medium ${
                          product.countInStock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </span>
                    </div>

                    {product.countInStock > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quantity:</span>
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      <FaShoppingCart className="text-lg" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h2>

              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {review.name}
                          </h4>
                          <Rating value={review.rating} />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {review.createdAt.substring(0, 10)}
                        </p>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Review Form */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Write a Customer Review
                </h3>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comment
                      </label>
                      <textarea
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Write your review..."
                      />
                    </div>

                    <button
                      disabled={loadingProductReview}
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <Message>
                    Please{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      sign in
                    </Link>{" "}
                    to write a review
                  </Message>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
