import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Try to use environment variable first, then fallback to local MongoDB
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/proshop";

    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.log("\n🔧 To fix this issue:");
    console.log(
      "1. Install MongoDB locally: https://www.mongodb.com/try/download/community"
    );
    console.log("2. OR use MongoDB Atlas (cloud): https://cloud.mongodb.com/");
    console.log("3. Create a .env file with your MONGO_URI");
    console.log("\n📝 Example .env file:");
    console.log("MONGO_URI=mongodb://localhost:27017/proshop");
    console.log("OR for Atlas:");
    console.log(
      "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/proshop"
    );

    process.exit(1);
  }
};

export default connectDB;
