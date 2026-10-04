require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Inventory API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

// Only listen when running on your computer (Vercel handles this itself)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

module.exports = app;
