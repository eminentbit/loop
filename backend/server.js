const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const learningRoutes = require("./routes/learningRoutes");
const eventRoutes = require("./routes/eventRoutes"); 
const pageRoutes = require("./routes/pageRoutes");

const session = require("express-session");
const { sequelize } = require("./db");
require("dotenv").config();

const db = require("./db"); 
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Allow requests from your frontend
app.use(bodyParser.json());

// After `app.use(bodyParser.json());`
app.use(
  session({
    name: "loop-session",
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/learning", learningRoutes); 
app.use("/api/event", eventRoutes);
app.use("/api/page", pageRoutes);

// Sync DB and start server
const PORT = process.env.PORT || 5000;

db.authenticate()
  .then(() => {
    console.log("✅ Connected to the database");

    return sequelize;
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err.message);
  });
