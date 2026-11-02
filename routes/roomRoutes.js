const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

// GET: pengunjung boleh melihat data kamar
router.get("/", roomController.getRooms);
router.get("/:id", roomController.getRoomById);

// POST, PUT, DELETE: hanya admin dengan token valid
router.post("/", authMiddleware, upload.single("image"), roomController.createRoom);
router.put("/:id", authMiddleware, upload.single("image"), roomController.updateRoom);
router.delete("/:id", authMiddleware, roomController.deleteRoom);

module.exports = router;