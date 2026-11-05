const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const newsController = require("../controllers/newsController");

// Konfigurasi Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);

router.post(
  "/",
  upload.single("image"),
  newsController.createNews
);

router.put(
  "/:id",
  upload.single("image"),
  newsController.updateNews
);

router.delete("/:id", newsController.deleteNews);

module.exports = router;