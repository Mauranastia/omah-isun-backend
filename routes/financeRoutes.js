const express = require("express");
const router = express.Router();

const financeController = require("../controllers/financeController");
const authMiddleware = require("../middleware/authMiddleware");

// Semua endpoint keuangan hanya bisa diakses admin
router.use(authMiddleware);

// GET: melihat seluruh transaksi
router.get("/", financeController.getFinance);

// GET: melihat satu transaksi
router.get("/:id", financeController.getFinanceById);

// POST: menambahkan transaksi
router.post("/", financeController.createFinance);

// PUT: mengubah transaksi
router.put("/:id", financeController.updateFinance);

// DELETE: menghapus transaksi
router.delete("/:id", financeController.deleteFinance);

module.exports = router;