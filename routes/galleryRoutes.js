const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getGallery);
router.post("/", upload.single("image"), galleryController.addGallery);
router.put("/:id", upload.single("image"), galleryController.updateGallery);
router.delete("/:id", galleryController.deleteGallery);

module.exports = router;