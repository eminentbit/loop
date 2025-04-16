import express, { json } from "express";
import cors from "cors";
require("dotenv").config();

import authRoutes from "./routes/authRoutes";
// const transactionRoutes = require("./routes/transactionRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(json());

// CORS config
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Session config
app.use(
  session({
    name: "loop_session",
    store: new SQLiteStore({ db: "session.sqlite", dir: "./" }),
    secret: process.env.SESSION_SECRET || "somesecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/subscription", subscriptionRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/admin", adminRoutes);

// Health check route
app.get("/api", (req, res) => {
  res.json({ message: "URL is working well" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
