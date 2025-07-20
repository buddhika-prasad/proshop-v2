import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

import { useLogoutMutation } from "../slices/usersApiSlice";

import { useSelector, useDispatch } from "react-redux";

import logo from "../assets/logo.png";
import { logout } from "../slices/authSlice";
import Searchbox from "./Searchbox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Debug logging for cart items
  console.log("Cart items in header:", cartItems);
  const cartItemCount = cartItems.reduce(
    (a, c) => a + (parseInt(c.qty) || 0),
    0
  );
  console.log("Cart item count:", cartItemCount);

  const logoutHandler = async () => {
    try {
      await logoutApiCall(logout()).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img src={logo} alt="ProShop" className="h-8 w-auto" />
            <span className="text-xl font-bold">ProShop</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Searchbox />

            {/* Cart */}
            <NavLink
              to="/cart"
              className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200"
            >
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            {/* User Menu */}
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200">
                  <FaUser className="text-lg" />
                  <span>{userInfo.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200"
              >
                <FaUser className="text-lg" />
                <span>Sign In</span>
              </NavLink>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200">
                  <span>Admin</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Orders
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 animate-slide-up">
            <div className="pt-4 space-y-4">
              <Searchbox />

              <NavLink
                to="/cart"
                className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="text-lg" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>

              {userInfo ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="block hover:text-blue-300 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left hover:text-blue-300 transition-colors duration-200"
                  >
                    Logout
                  </button>
                  {userInfo.isAdmin && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="text-sm text-gray-400 mb-2">Admin</div>
                      <Link
                        to="/admin/userlist"
                        className="block hover:text-blue-300 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="block hover:text-blue-300 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block hover:text-blue-300 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Orders
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="text-lg" />
                  <span>Sign In</span>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
