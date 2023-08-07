const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async home(req, res) {
    try {
        const id = req.session.userid;
        const semester_year = req.session.semesterYear;
      
      const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });
      const results = await queryPromise(connection, `
      SELECT 
              dosen_id, 
              dosen_name, 
              matkul_name,
              matkul_id,
              CONCAT(
                SUBSTRING_INDEX(SUBSTRING_INDEX(prodi_name, ' ', 1), ' ', 1),
                ' ',
                SUBSTRING_INDEX(SUBSTRING_INDEX(prodi_name, ' ', 2), ' ', -1)
              ) AS prodi_name_abbr,
              kelas_semester,
              kelas_subkelas,
              CASE WHEN table_answer.answer_semester = '${semester_year}'
                THEN COUNT(answer_id)
                ELSE 0
              END AS answer_count 
            FROM 
              table_user 
              INNER JOIN table_kbm ON table_kbm.kbm_kelas = table_user.user_kelas 
              INNER JOIN table_dosen ON table_dosen.dosen_id = table_kbm.kbm_dosen 
              INNER JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
              LEFT JOIN table_answer ON table_answer.answer_dosen = table_dosen.dosen_id
                AND table_answer.answer_user = table_user.user_id 
              INNER JOIN table_kelas ON table_user.user_kelas = table_kelas.kelas_id
              INNER JOIN table_prodi ON table_kelas.kelas_prodi = table_prodi.prodi_id
            WHERE 
              table_user.user_id = '${id}' AND
              table_kbm.kbm_semester = '${semester_year}'
            GROUP BY 
              dosen_id, 
              dosen_name,
              matkul_name,
              matkul_id;
      `);

      res.render("home", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        userid: id,
        semesterYear: req.session.semesterYear,
        semesterGage: req.session.semesterGage,
        dosen_name: results, // Change the key to dosen_names and assign the entire results object
        dosen_id: results, // Change the key to dosen_names and assign the entire results object
        answer_count: results,
        matkul_name: results,
        kelas_name: results,
        matkul_id: results,
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  }, 
  async unauthorized(req, res) {
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
      const results = await queryPromise(connection, `SELECT user_role from table_user where user_id='${id}'`);

      res.render("unauthorized", {
        url: 'http://localhost:5050/',
        user_role: results,
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async noresults(req, res) {
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
      const results = await queryPromise(connection, `SELECT user_role from table_user where user_id='${id}'`);

      res.render("noresults", {
        url: 'http://localhost:5050/',
        user_role: results,
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async notcompleted(req, res) {
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
      const results = await queryPromise(connection, `SELECT user_role from table_user where user_id='${id}'`);

      res.render("notcompleted", {
        url: 'http://localhost:5050/',
        user_role: results,
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
};

function queryPromise(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
