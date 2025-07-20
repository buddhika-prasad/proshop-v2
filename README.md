ProShop - Full Stack E-Commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart functionality, and PayPal payment integration.

Features

User Features
- User Authentication: Register, login, and profile management
- Product Browsing: View products with search and pagination
- Shopping Cart: Add/remove items with quantity management
- Order Management: Place orders and view order history
- Payment Integration: Secure PayPal payment processing
- Product Reviews: Rate and review products
- Responsive Design: Mobile-friendly interface

Admin Features
- Product Management: Add, edit, and delete products
- User Management: View and manage user accounts
- Order Management: Process and track orders
- Inventory Control: Manage product stock levels

Tech Stack

Frontend
- React.js 18.2.0 - UI framework
- React Router DOM 7.6.2 - Client-side routing
- Redux Toolkit 2.8.2 - State management
- React Bootstrap 2.10.10 - UI components
- React Icons 5.5.0 - Icon library
- React Toastify 11.0.5 - Notifications
- PayPal React JS 8.8.3 - Payment integration
- Axios 1.10.0 - HTTP client

Backend
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- JWT - Authentication
- bcryptjs - Password hashing
- Multer - File uploads

Project Structure

proshop-v2/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # Page components
│   │   ├── slices/          # Redux Toolkit slices
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Images and styles
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── data/                # Sample data
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
└── uploads/                 # File uploads directory

Getting Started

Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

Installation

1. Clone the repository
   git clone <your-repo-url>
   cd proshop

2. Install backend dependencies
   cd proshop-v2/backend
   npm install

3. Install frontend dependencies
   cd ../frontend
   npm install

4. Environment Setup
   
   Create a .env file in the backend directory:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id

5. Database Setup
   cd backend
   npm run data:import    # Import sample data

6. Run the application

   Backend (Terminal 1):
   cd backend
   npm start

   Frontend (Terminal 2):
   cd frontend
   npm start

7. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

Sample Data

The application comes with sample data including:
- Products: Electronics, cameras, gaming accessories
- Users: Admin and regular user accounts
- Orders: Sample order history

Default Admin Credentials
- Email: admin@example.com
- Password: 123456

Available Scripts

Frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App

Backend
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run data:import # Import sample data
npm run data:destroy # Clear all data

API Endpoints

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

Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | No (default: 5000) |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| PAYPAL_CLIENT_ID | PayPal client ID for payments | Yes |

Deployment

Frontend Deployment
1. Build the application: npm run build
2. Deploy the build folder to your hosting service

Backend Deployment
1. Set environment variables on your hosting platform
2. Deploy the backend folder
3. Update frontend API endpoints to point to your deployed backend

Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.

Author

Buddhika Prasad
- GitHub: https://github.com/buddhika-prasad

Acknowledgments

- Traversy Media 
- React Bootstrap for UI components
- PayPal for payment integration

---

If you found this project helpful, please give it a star!
