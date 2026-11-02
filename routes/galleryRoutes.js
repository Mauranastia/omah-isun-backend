const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");

// GET: pengunjung boleh melihat galeri
router.get("/", galleryController.getGallery);

// POST, PUT, DELETE: hanya admin dengan token valid
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  galleryController.addGallery
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  galleryController.updateGallery
);

router.delete("/:id", authMiddleware, galleryController.deleteGallery);

module.exports = router;