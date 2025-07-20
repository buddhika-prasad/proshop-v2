# MongoDB Setup Guide for ProShop

## 🚀 Quick Setup with MongoDB Atlas (Recommended)

### Step 1: Create MongoDB Atlas Account

1. Go to https://cloud.mongodb.com/
2. Click "Try Free" and create an account
3. Choose "Free" tier (M0)

### Step 2: Create Database Cluster

1. Click "Build a Database"
2. Choose "FREE" tier
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to you
5. Click "Create"

### Step 3: Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### Step 4: Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

### Step 6: Create .env File

Create a `.env` file in your project root with:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/proshop?retryWrites=true&w=majority
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

Replace `your_username` and `your_password` with what you created in Step 3.

## 🔧 Alternative: Local MongoDB Installation

### Windows:

1. Download from: https://www.mongodb.com/try/download/community
2. Run installer
3. Install as Windows Service
4. MongoDB will start automatically

### Mac:

```bash
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu):

```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## ✅ Test Your Connection

After setting up, run:

```bash
npm run server
```

You should see: `✅ MongoDB connected: [your-cluster-url]`

## 🆘 Troubleshooting

- **Connection refused**: MongoDB not running or wrong URI
- **Authentication failed**: Wrong username/password
- **Network timeout**: Check firewall settings
- **Atlas connection issues**: Make sure IP is whitelisted
