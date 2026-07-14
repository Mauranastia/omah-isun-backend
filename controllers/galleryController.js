const db = require("../config/db");

// GET
exports.getGallery = (req, res) => {
  db.query("SELECT * FROM gallery ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// POST
exports.addGallery = (req, res) => {

  const { title } = req.body;

  const image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO gallery(title,image) VALUES(?,?)",
    [title, image],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        message: "Galeri berhasil ditambahkan",
      });

    }
  );

};

// PUT
exports.updateGallery = (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  if (req.file) {

    db.query(
      "UPDATE gallery SET title=?, image=? WHERE id=?",
      [title, req.file.filename, id],
      (err) => {

        if (err) return res.status(500).json(err);

        res.json({
          message: "Galeri berhasil diupdate",
        });

      }
    );

  } else {

    db.query(
      "UPDATE gallery SET title=? WHERE id=?",
      [title, id],
      (err) => {

        if (err) return res.status(500).json(err);

        res.json({
          message: "Galeri berhasil diupdate",
        });

      }
    );

  }

};
// DELETE
exports.deleteGallery = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM gallery WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Galeri berhasil dihapus",
      });
    }
  );
};