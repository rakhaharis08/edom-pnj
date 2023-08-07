const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async prodi(req, res) {
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
      const prodiResults = await queryPromise(connection, `SELECT prodi_id,prodi_name, jurusan_name FROM table_prodi JOIN table_jurusan ON table_prodi.prodi_jurusan = table_jurusan.jurusan_id`);

      res.render("prodi", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        prodi_prodi: prodiResults
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async addprodi(req, res) {
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
      const jurusanResults = await queryPromise(connection, `SELECT * FROM table_jurusan`);

      res.render("addProdi", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        jurusan_jurusan  : jurusanResults
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async saveprodi(req, res) {
    try {
      const prodi = req.body.prodi;
      const jurusan = req.body.jurusan;
      
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

        await queryPromise(connection, "INSERT INTO table_prodi (prodi_name,prodi_jurusan) VALUES (?,?)", [prodi,jurusan]);

        res.redirect("/prodi");

        connection.release();
      } else {
        res.redirect("/addd-prodi");
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
  async hapusprodi(req, res) {
    try {
      const prodi = req.query.id;
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
        
    
        const prodi_results = await queryPromise(connection, `SELECT * FROM table_kelas WHERE kelas_prodi = '${prodi}'`);
        if (prodi_results.length > 0) {
          // If there are users, do not delete the class
          connection.release();
          res.send(`<script>alert('Tidak dapat menghapus prodi karena terdapat kelas terkait!'); window.location.href = '/prodi';</script>`);
        } else {
          // If there are no users, proceed with the class deletion
          await queryPromise(connection, `DELETE from table_prodi where prodi_id='${prodi}'`);
          connection.release();
          res.redirect("/prodi");
        }
      } else {
        res.redirect("/add-prodi");
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
