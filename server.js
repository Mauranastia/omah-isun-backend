const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// koneksi database
require("./config/db");

// middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const newsRoutes = require("./routes/newsRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const financeRoutes = require("./routes/financeRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes); 
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/finance", financeRoutes);

// route testing
app.get("/", (req, res) => {
  res.send("Backend Omah Isun Berjalan 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});