const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async semester(req, res) {
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
      const semesterResults = await queryPromise(connection, `SELECT * from table_semester`);

      res.render("semester", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        semester_semester: semesterResults
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async addsemester(req, res) {
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

      res.render("addSemester", {
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
  async savesemester(req, res) {
    try {
      const year = req.body.semester;
      const gage = req.body.gage;
      const status = 0;
      
      if (year) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });

        await queryPromise(connection, "INSERT INTO table_semester (semester_year,semester_gage,semester_status) VALUES (?,?,?)", [year,gage,status]);

        res.redirect("/semester");

        connection.release();
      } else {
        res.redirect("/add-semester");
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
  async changesemester(req, res) {
    try {
      const semester_id = req.body.semester_id;
  
      if (semester_id) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
  
        // Update current semester_status to 1
        await new Promise((resolve, reject) => {
          connection.query(
            "UPDATE table_semester SET semester_status = 1 WHERE semester_id = ?",
            [semester_id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
  
        // Update other semesters to semester_status 0
        await new Promise((resolve, reject) => {
          connection.query(
            "UPDATE table_semester SET semester_status = 0 WHERE semester_id != ?",
            [semester_id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
  
        res.redirect("/semester");
  
        connection.release();
      } else {
        res.redirect("/semester");
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
