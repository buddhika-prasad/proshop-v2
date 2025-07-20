ProShop - Full Stack E-Commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart functionality, PayPal payment integration, and a beautiful UI powered by Tailwind CSS.

FEATURES

User Features
- User Authentication: Secure register, login, and profile management
- Product Browsing: View products with advanced search and pagination
- Shopping Cart: Add/remove items with real-time quantity management
- Order Management: Place orders and view comprehensive order history
- Payment Integration: Secure card payment processing
- Product Reviews: Rate and review products with star ratings
- Responsive Design: Mobile-first, responsive interface
- Modern UI: Beautiful design with Tailwind CSS animations

Admin Features
- Product Management: Add, edit, and delete products with image uploads
- User Management: View and manage user accounts
- Order Management: Process and track orders with status updates
- Inventory Control: Manage product stock levels
- Dashboard: Comprehensive admin dashboard

TECH STACK

Frontend
- React.js 18.2.0 - Modern UI framework
- React Router DOM 7.6.2 - Client-side routing
- Redux Toolkit 2.8.2 - State management
- Tailwind CSS 3.4.17 - Utility-first CSS framework
- React Bootstrap 2.10.10 - UI components
- React Icons 5.5.0 - Icon library
- React Toastify 11.0.5 - Notifications
- Axios 1.10.0 - HTTP client
- React Helmet Async 2.0.5 - Document head management

Backend
- Node.js - Runtime environment
- Express.js 5.1.0 - Web framework
- MongoDB - NoSQL database
- Mongoose 8.16.0 - ODM for MongoDB
- JWT 9.0.2 - Authentication
- bcryptjs 3.0.2 - Password hashing
- Multer 2.0.1 - File uploads
- Express Async Handler 1.2.0 - Async error handling

GETTING STARTED

Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

Installation

1. Clone the repository
   git clone https://github.com/yourusername/proshop-v2.git
   cd proshop-v2

2. Install dependencies
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install

3. Environment Setup
   
   Create a .env file in the backend directory:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   

4. Database Setup
   cd backend
   npm run data:import    # Import sample data

5. Run the application

   Option 1: Run both frontend and backend together
   # From root directory
   npm run dev

   Option 2: Run separately
   # Backend (Terminal 1)
   cd backend
   npm run server

   # Frontend (Terminal 2)
   cd frontend
   npm start

6. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

SAMPLE DATA

The application comes with comprehensive sample data including:
- Products: Electronics, cameras, gaming accessories, and more
- Users: Admin and regular user accounts
- Orders: Sample order history with various statuses

Default Admin Credentials
- Email: admin@example.com
- Password: 123456

AVAILABLE SCRIPTS

Root Directory
npm start          # Start production server
npm run server     # Start development server with nodemon
npm run client     # Start frontend development server
npm run dev        # Run both frontend and backend concurrently
npm run data:import # Import sample data
npm run data:destroy # Clear all data

Frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App

Backend
npm start          # Start production server
npm run dev        # Start development server with nodemon

API ENDPOINTS

Authentication
- POST /api/users/login - User login
- POST /api/users/register - User registration
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

Products
- GET /api/products - Get all products (with pagination)
- GET /api/products/:id - Get single product
- POST /api/products - Create product (Admin only)
- PUT /api/products/:id - Update product (Admin only)
- DELETE /api/products/:id - Delete product (Admin only)

Orders
- POST /api/orders - Create new order
- GET /api/orders/myorders - Get user orders
- GET /api/orders/:id - Get order by ID
- PUT /api/orders/:id/pay - Update order to paid
- PUT /api/orders/:id/deliver - Update order to delivered (Admin only)

Users (Admin)
- GET /api/users - Get all users (Admin only)
- DELETE /api/users/:id - Delete user (Admin only)
- PUT /api/users/:id - Update user (Admin only)

ENVIRONMENT VARIABLES

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| NODE_ENV | Environment (development/production) | Yes | - |
| PORT | Server port | No | 5000 |
| MONGO_URI | MongoDB connection string | Yes | - |
| JWT_SECRET | JWT signing secret | Yes | - |


DEPLOYMENT

Frontend Deployment
1. Build the application:
   cd frontend
   npm run build
2. Deploy the build folder to your hosting service (Vercel, Netlify, etc.)

Backend Deployment
1. Set environment variables on your hosting platform
2. Deploy the backend folder to your server (Heroku, Railway, etc.)
3. Update frontend API endpoints to point to your deployed backend

MongoDB Setup
- Use MongoDB Atlas for cloud database
- Or set up a local MongoDB instance
- Ensure proper network access and authentication

CONTRIBUTING

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Development Guidelines
- Follow the existing code style
- Add proper error handling
- Include comments for complex logic
- Test your changes thoroughly

LICENSE

This project is licensed under the MIT License - see the LICENSE file for details.

AUTHOR

Buddhika Prasad
- GitHub: https://github.com/buddhika-prasad
- LinkedIn: https://www.linkedin.com/in/buddhika-prasad-930975275/

ACKNOWLEDGMENTS

- Traversy Media 
- React Bootstrap
- Tailwind CSS
- MongoDB 


SUPPORT

If you found this project helpful, please give it a star!

For support, email buddhikaprasad3040@gmail.com or create an issue in this repository.

---

Happy Shopping! 
