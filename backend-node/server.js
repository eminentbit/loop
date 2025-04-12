const express = require("express");
const { connectDB, sequelize } = require("./db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const learningRoutes = require("./routes/learningRoutes");
// const learningRoutes = require("./routes/learningRoutes");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies.

// Connect to the database.
connectDB();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Allowed domains
  methods: ["GET", "POST"], // Allowed methods (optional)
  credentials: true, // Allow credentials (optional)
  optionsSuccessStatus: 200, // For legacy browser support (optional)
};

// Sync models with the database.
sequelize.sync({ alter: false }).then(() => {
  console.log("Database synced successfully!");
});

app.use(cors(corsOptions));

// Set up session middleware
app.use(
  session({
    name: "loop_session",
    store: new SQLiteStore({ db: "database.sqlite", dir: "./" }),
    secret: process.env.SESSION_SECRET || "somesecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    },
  })
);

// Use  routes.
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Url is working well" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
