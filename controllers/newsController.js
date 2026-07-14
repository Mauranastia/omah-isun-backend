const db = require("../config/db");

// ===============================
// GET Semua Berita
// ===============================
exports.getAllNews = (req, res) => {
  const sql = "SELECT * FROM news ORDER BY date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// ===============================
// GET Detail Berita
// ===============================
exports.getNewsById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM news WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Berita tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

// ===============================
// TAMBAH BERITA
// ===============================
exports.createNews = (req, res) => {

  const {
    title,
    date,
    description,
    content,
    category,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO news
    (title,date,description,content,image,category)
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      title,
      date,
      description,
      content,
      image,
      category,
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Berita berhasil ditambahkan",
      });

    }
  );

};

// ===============================
// UPDATE BERITA
// ===============================
exports.updateNews = (req, res) => {

  const { id } = req.params;

  const {
    title,
    date,
    description,
    content,
    category,
  } = req.body;

  if (req.file) {

    const sql = `
      UPDATE news
      SET
        title=?,
        date=?,
        description=?,
        content=?,
        image=?,
        category=?
      WHERE id=?
    `;

    db.query(
      sql,
      [
        title,
        date,
        description,
        content,
        req.file.filename,
        category,
        id,
      ],
      (err) => {

        if (err) return res.status(500).json(err);

        res.json({
          message: "Berita berhasil diperbarui",
        });

      }
    );

  } else {

    const sql = `
      UPDATE news
      SET
        title=?,
        date=?,
        description=?,
        content=?,
        category=?
      WHERE id=?
    `;

    db.query(
      sql,
      [
        title,
        date,
        description,
        content,
        category,
        id,
      ],
      (err) => {

        if (err) return res.status(500).json(err);

        res.json({
          message: "Berita berhasil diperbarui",
        });

      }
    );

  }

};

// ===============================
// HAPUS BERITA
// ===============================
exports.deleteNews = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM news WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Berita berhasil dihapus",
    });
  });
};