import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ _id: userId, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            to="/admin/userlist"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </Link>

          {/* Main Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center space-x-3 mb-8">
              <FaUser className="text-blue-600 text-2xl" />
              <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
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
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <FaUser className="inline mr-2 text-gray-500" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <FaEnvelope className="inline mr-2 text-gray-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Admin Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                  />
                  <label
                    htmlFor="isAdmin"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                  >
                    <FaShieldAlt className="text-gray-500" />
                    <span>Is Admin</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingUpdate}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <FaSave />
                  <span>{loadingUpdate ? "Updating..." : "Update User"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditScreen;
