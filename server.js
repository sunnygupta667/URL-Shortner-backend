import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// import routes
import userRoutes from "./routes/userRoutes.js";
app.use("/auth", userRoutes);

import urlRoutes from "./routes/urlRoutes.js";
app.use("/url", urlRoutes);

// Redirect route must be last to avoid conflicts
app.use("/", urlRoutes);


// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'URL Shortener API is running',
    timestamp: new Date()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


const PORT = process.env.PORT || 5000;

// Function to connect DB and start server
const startServer = async () => {
  try {
    const isConnected = await connectDB();

    if (isConnected) {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } else {
      console.log("❌ Server not started because database connection failed.");
    }
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
  }
};

startServer();
