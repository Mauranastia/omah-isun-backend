const mysql = require("mysql2");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database gagal terhubung:");
    console.error("Kode error:", err.code);
    console.error("Pesan:", err.message);
    return;
  }

  console.log("Database berhasil terhubung");
});

// db.connect((err) => {
//   if (err) {
//     console.log("Database gagal terhubung");
//     console.log(err);
//     return;
//   }

//   console.log("Database berhasil terhubung");
// });
// [{"id":1,"name":"Kamar Standard","capacity":"2 Orang","description":"Nyaman untuk 3 orang","facilities":"AC,WiFi,TV,Kamar Mandi Dalam","image":"room3.png","created_at":"2026-06-17T08:32:59.000Z"},{"id":2,"name":"Kamar Twin","capacity":"2 Orang","description":"Dua ranjang single","facilities":"2 Single Bed,AC,WiFi,TV,Kamar Mandi Dalam","image":"room2.png","created_at":"2026-06-17T08:32:59.000Z"},{"id":3,"name":"Kamar Deluxe","capacity":"4 Orang","description":"Cocok untuk keluarga","facilities":"AC,WiFi,TV,Kamar Mandi Dalam,Ruang Lebih Luas","image":"room1.png","created_at":"2026-06-17T08:32:59.000Z"}]
// module.exports = db;