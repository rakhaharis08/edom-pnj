const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async user(req, res) {
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

      res.render("auth-user", {
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
  async adduser(req, res) {
    try {
      const email = req.body.email;
      const key = req.body.key;
      
      if (email) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });

        await queryPromise(connection, "INSERT INTO table_auth (auth_email,auth_key) VALUES (?,?)", [email,key]);

        res.redirect("/auth-register");

        connection.release();
      } else {
        res.redirect("/addd-prodi");
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
