import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// const transactionRoutes = require("./routes/transactionRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST"],
  })
);
app.use(cookieParser()); // allow cookie parsing

app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/subscription", subscriptionRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
