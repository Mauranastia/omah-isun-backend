const db = require("../config/db");

// ======================
// GET semua transaksi
// ======================
exports.getFinance = (req, res) => {
  db.query(
    "SELECT * FROM finance ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ======================
// GET satu transaksi
// ======================
exports.getFinanceById = (req, res) => {
  db.query(
    "SELECT * FROM finance WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }

      res.json(result[0]);
    }
  );
};

// ======================
// TAMBAH TRANSAKSI
// ======================
exports.createFinance = (req, res) => {
  const {
    guest_name,
    room,
    check_in,
    check_out,
    total,
  } = req.body;

  db.query(
    `INSERT INTO finance
    (guest_name, room, check_in, check_out, total)
    VALUES (?,?,?,?,?)`,
    [
      guest_name,
      room,
      check_in,
      check_out,
      total,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Transaksi berhasil ditambahkan",
      });
    }
  );
};

// ======================
// UPDATE
// ======================
exports.updateFinance = (req, res) => {
  const {
    guest_name,
    room,
    check_in,
    check_out,
    total,
  } = req.body;

  db.query(
    `UPDATE finance
     SET guest_name=?,
         room=?,
         check_in=?,
         check_out=?,
         total=?
     WHERE id=?`,
    [
      guest_name,
      room,
      check_in,
      check_out,
      total,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Transaksi berhasil diubah",
      });
    }
  );
};

// ======================
// DELETE
// ======================
exports.deleteFinance = (req, res) => {
  db.query(
    "DELETE FROM finance WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Transaksi berhasil dihapus",
      });
    }
  );
};