const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async kbm(req, res) {
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
      const kbmResults = await queryPromise(connection, `SELECT tk.kelas_name, td.dosen_name, tm.matkul_name
      FROM table_kbm tkb
      JOIN table_kelas tk ON tkb.kbm_kelas = tk.kelas_id
      JOIN table_dosen td ON tkb.kbm_dosen = td.dosen_id
      JOIN table_matkul tm ON tkb.kbm_matkul = tm.matkul_id
      WHERE tkb.kbm_semester = '2';
      `);

      res.render("kbm", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        kbm_kbm: kbmResults
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async addkbm(req, res) {
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
      const kelasResults = await queryPromise(connection, `SELECT * FROM table_kelas`);
      const dosenResults = await queryPromise(connection, `SELECT * FROM table_dosen`);
      const matkulResults = await queryPromise(connection, `SELECT * FROM table_matkul`);

      res.render("addKbm", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        kelas_kelas  : kelasResults,
        dosen_dosen : dosenResults,
        matkul_matkul : matkulResults
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
  async savekbm(req, res) {
    try {
      const kelas = req.body.kelas;
      const dosen = req.body.dosen;
      const matkul = req.body.matkul;
      let semester_year = req.session.semesterYear;
      
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

        await queryPromise(connection, "INSERT INTO table_kbm (kbm_kelas,kbm_dosen,kbm_matkul,kbm_semester) VALUES (?,?,?,?)", [kelas,dosen,matkul,semester_year]);

        res.redirect("/kbm");

        connection.release();
      } else {
        res.redirect("/add-kbm");
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
