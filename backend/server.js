import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { verifyToken } from "./middlewares/verifyToken.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

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
app.use("/api/events", verifyToken, eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
