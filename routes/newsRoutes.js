const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const newsController = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

// Konfigurasi upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET: publik dapat melihat berita
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);

// POST, PUT, DELETE: hanya admin dengan token valid
router.post("/", authMiddleware, upload.single("image"), newsController.createNews);
router.put("/:id", authMiddleware, upload.single("image"), newsController.updateNews);
router.delete("/:id", authMiddleware, newsController.deleteNews);

module.exports = router;