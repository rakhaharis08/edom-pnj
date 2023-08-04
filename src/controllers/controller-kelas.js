const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async kelas(req, res) {
    try {
      const id = req.session.userid;
      const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });
  
      const results = await queryPromise(connection, `SELECT * FROM table_user WHERE user_id = '${id}'`);
      const kelasResults = await queryPromise(connection, `
        SELECT table_kelas.*, table_prodi.prodi_name
        FROM table_kelas
        JOIN table_prodi ON table_kelas.kelas_prodi = table_prodi.prodi_id
      `);
  
      // Modifikasi data kelasResults untuk menampilkan singkatan huruf depan prodi_name
      const modifiedKelasResults = kelasResults.map((kelas) => {
        const prodiName = kelas.prodi_name;
        const prodiNameAbbreviated = prodiName
          .split(' ')
          .map((word) => word.charAt(0)) // Mengambil karakter pertama dari setiap kata
          .join(''); // Menggabungkan singkatan huruf depan menjadi satu kata
        return {
          ...kelas,
          prodi_name: prodiNameAbbreviated,
        };
      });
  
      res.render("kelas", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        kelas_kelas: modifiedKelasResults,
      });
  
      connection.release();
    } catch (error) {
      throw error;
    }
  },
  
  async addkelas(req, res) {
    try {
      const id = req.session.userid;
      const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });

      const results = await queryPromise(connection, `SELECT * FROM table_user WHERE user_id = '${id}'`);
      const prodiResults = await queryPromise(connection, `
      SELECT prodi_id, prodi_name FROM table_prodi
    `);

      res.render("addKelas", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        prodi_prodi  : prodiResults,
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async savekelas(req, res) {
    try {
      const prodi = req.body.prodi;
      const semester = req.body.semester;
      const subkelas = req.body.subkelas;
  
      if (prodi) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
  
        await queryPromise(connection, "INSERT INTO table_kelas (kelas_semester, kelas_subkelas, kelas_prodi) VALUES (?,?,?)", [semester, subkelas, prodi]);
  
        connection.release();
        res.redirect("/kelas");
      } else {
        res.redirect("/add-kelas");
        res.end();
      }
    } catch (error) {
      throw error;
    }
  }
  
};

function queryPromise(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
