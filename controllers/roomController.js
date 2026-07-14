const db = require("../config/db");

// GET semua kamar
exports.getRooms = (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// GET satu kamar
exports.getRoom = (req, res) => {
  db.query(
    "SELECT * FROM rooms WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// Tambah kamar
exports.createRoom = (req, res) => {
  const { name, capacity, description, facilities } = req.body;

  const image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO rooms(name, capacity, description, facilities, image) VALUES (?,?,?,?,?)",
    [name, capacity, description, facilities, image],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Kamar berhasil ditambahkan",
      });
    }
  );
};

// Edit kamar
exports.updateRoom = (req, res) => {
  const {
    name,
    capacity,
    description,
    facilities,
  } = req.body;

  if (req.file) {
    db.query(
      "UPDATE rooms SET name=?, capacity=?, description=?, facilities=?, image=? WHERE id=?",
      [
        name,
        capacity,
        description,
        facilities,
        req.file.filename,
        req.params.id,
      ],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Kamar berhasil diubah",
        });
      }
    );
  } else {
    db.query(
      "UPDATE rooms SET name=?, capacity=?, description=?, facilities=? WHERE id=?",
      [
        name,
        capacity,
        description,
        facilities,
        req.params.id,
      ],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Kamar berhasil diubah",
        });
      }
    );
  }
};
// Hapus kamar
exports.deleteRoom = (req, res) => {
  db.query(
    "DELETE FROM rooms WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Kamar berhasil dihapus",
      });
    }
  );
};

exports.getRoomById = (req, res) => {
  db.query(
    "SELECT * FROM rooms WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Kamar tidak ditemukan",
        });
      }

      res.json(result[0]);
    }
  );
};