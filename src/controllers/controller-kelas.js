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
      const kelasResults = await queryPromise(connection, `SELECT * from table_kelas`);

  
      res.render("kelas", {
        url: 'https://beautiful-pink-scarab.cyclic.app',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        kelas_kelas : kelasResults
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

      res.render("addKelas", {
        url: 'https://beautiful-pink-scarab.cyclic.app',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async savekelas(req, res) {
    try {
      const kelas = req.body.kelas;
      
      if (kelas) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });

        await queryPromise(connection, "INSERT INTO table_kelas (kelas_name) VALUES (?)", [kelas]);

        res.redirect("/kelas");

        connection.release();
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
