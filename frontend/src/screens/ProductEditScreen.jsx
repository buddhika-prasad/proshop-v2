import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBox,
  FaDollarSign,
  FaImage,
  FaTag,
  FaLayerGroup,
  FaListOl,
  FaFileAlt,
  FaSave,
  FaUpload,
} from "react-icons/fa";

import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err?.error || "Image upload failed");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();

      toast.success("Product Updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/admin/productlist"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </Link>

          {/* Main Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center space-x-3 mb-8">
              <FaBox className="text-blue-600 text-2xl" />
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            </div>

            {loadingUpdate && (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            )}

            {error && (
              <div className="mb-6">
                <Message variant="danger">{error?.data?.message}</Message>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            ) : (
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FaBox className="inline mr-2 text-gray-500" />
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Price Field */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FaDollarSign className="inline mr-2 text-gray-500" />
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Brand Field */}
                  <div>
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FaTag className="inline mr-2 text-gray-500" />
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FaLayerGroup className="inline mr-2 text-gray-500" />
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Count In Stock Field */}
                  <div>
                    <label
                      htmlFor="countInStock"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FaListOl className="inline mr-2 text-gray-500" />
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      id="countInStock"
                      placeholder="Enter count in stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Image Section */}
                <div className="space-y-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <FaImage className="inline mr-2 text-gray-500" />
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label
                      htmlFor="imageFile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaUpload className="inline mr-2 text-gray-500" />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="imageFile"
                      onChange={uploadFileHandler}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                      accept="image/*"
                    />
                    {loadingUpload && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Loader />
                        <span>Uploading image...</span>
                      </div>
                    )}
                  </div>

                  {/* Image Preview */}
                  {image && (
                    <div className="mt-4">
                      <img
                        src={image}
                        alt="Product preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <FaFileAlt className="inline mr-2 text-gray-500" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingUpdate}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <FaSave />
                  <span>
                    {loadingUpdate ? "Updating..." : "Update Product"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;
