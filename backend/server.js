import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import networkRoutes from "./routes/networkRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import limiter from "./middlewares/limiter.js";
import helmet from "helmet";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(helmet());

app.use("/", limiter); // Rate limiter

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/feed/posts", feedRoutes);
app.use("/api/feed/comments", commentRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/network", networkRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
