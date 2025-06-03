import dotenv from "dotenv";
dotenv.config(); // ✅ Loads .env from project root

import express from "express";
const app = express(); // ✅ Create express app

import connectDB from "./db/index.js";

// DB connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`✅ Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
