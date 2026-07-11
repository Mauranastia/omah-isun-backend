const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Register Admin
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek email
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({
            message: "Email sudah digunakan",
          });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
          [name, email, hashPassword, "admin"],
          (err) => {
            if (err) return res.status(500).json(err);

            res.json({
              message: "Admin berhasil dibuat",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login Admin
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Email tidak ditemukan",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login berhasil",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};