const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async matkul(req, res) {
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
      const matkul_results = await queryPromise(connection, `SELECT * from table_matkul`);

      res.render("matkul", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        matkul_matkul: matkul_results
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async addmatkul(req, res) {
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

      res.render("addMatkul", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async savematkul(req, res) {
    try {
      const matkul = req.body.matkul;
      
      if (matkul) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
        await queryPromise(connection, "INSERT INTO table_matkul (matkul_name) VALUES (?)", [matkul]);

        res.redirect("/matkul");

        connection.release();
      } else {
        res.redirect("/add-matkul");
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
  async hapusmatkul(req, res) {
    try {
      const matkul = req.query.id;
      if (matkul) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
        
    
        const matkul_results = await queryPromise(connection, `SELECT * FROM table_kbm WHERE kbm_matkul = '${matkul}'`);
        if (matkul_results.length > 0) {
          // If there are users, do not delete the class
          connection.release();
          res.send(`<script>alert('Tidak dapat menghapus matkul karena terdapat kbm terkait!'); window.location.href = '/matkul';</script>`);
        } else {
          // If there are no users, proceed with the class deletion
          await queryPromise(connection, `DELETE from table_matkul where matkul_id='${matkul}'`);
          connection.release();
          res.redirect("/matkul");
        }
      } else {
        res.redirect("/add-matkul");
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
