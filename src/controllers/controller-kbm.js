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

      const results = await queryPromise(connection, `SELECT * FROM table_user WHERE user_id = '${id}'`);
      const kbmResults = await queryPromise(connection, `
      SELECT 
        prodi_name,
        kbm_id,
        kelas_semester,
        kelas_subkelas,
        dosen_name,
        matkul_name
      FROM
        table_kbm
      INNER JOIN table_kelas ON table_kelas.kelas_id = table_kbm.kbm_kelas
      INNER JOIN table_prodi ON table_prodi.prodi_id = table_kelas.kelas_prodi
      INNER JOIN table_dosen ON table_dosen.dosen_id = table_kbm.kbm_dosen
      INNER JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
      WHERE
      table_kbm.kbm_semester = '${semester_year}'
      ORDER BY table_kelas.kelas_id -- Urutkan berdasarkan kelas_id
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
      const kelasResults = await queryPromise(connection, `SELECT kelas_id,prodi_name,kelas_semester,kelas_subkelas FROM table_kelas INNER JOIN table_prodi ON table_prodi.prodi_id = table_kelas.kelas_prodi`);
      const dosenResults = await queryPromise(connection, `SELECT * FROM table_dosen ORDER BY dosen_name ASC`);
      const matkulResults = await queryPromise(connection, `SELECT * FROM table_matkul ORDER BY matkul_name ASC;`);
      
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
  
      res.render("addKbm", {
        url: 'http://localhost:5050/',
        userName: req.session.username,
        nama: results[0]['user_name'],
        email: results[0]['user_email'],
        kelas_kelas  : modifiedKelasResults,
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
      const semester_year = req.session.semesterYear;
    
      if (req.body) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
    
        // Check if the request body has keys for matkul and dosen
        if ('matkul' in req.body && 'dosen' in req.body) {
          const matkul = Array.isArray(req.body.matkul) ? req.body.matkul : [req.body.matkul];
          const dosen = Array.isArray(req.body.dosen) ? req.body.dosen : [req.body.dosen];
          
          // Memastikan matkul dan dosen memiliki jumlah yang sama
          if (matkul.length === dosen.length) {
            for (let i = 0; i < matkul.length; i++) {
              await queryPromise(connection, "INSERT INTO table_kbm (kbm_kelas, kbm_dosen, kbm_matkul, kbm_semester) VALUES (?, ?, ?, ?)", [kelas, dosen[i], matkul[i], semester_year]);
            }
    
            res.redirect("/kbm");
          } else {
            res.redirect("/add-kbm");
            res.end();
          }
        } else {
          res.redirect("/add-kbm");
          res.end();
        }
    
        connection.release();
      } else {
        res.redirect("/add-kbm");
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
  async hapuskbm(req, res) {
    try {
      const kbm = req.query.id;
      if (kbm) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
        
    
        const kbm_results = await queryPromise(connection, `
        SELECT * FROM table_kbm
        JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
        JOIN table_kelas ON table_kbm.kbm_kelas = table_kelas.kelas_id
        JOIN table_user ON table_kelas.kelas_id = table_user.user_kelas
        JOIN table_answer ON table_user.user_id = table_answer.answer_user AND table_matkul.matkul_id = table_answer.answer_matkul
        
        WHERE table_kbm.kbm_id='${kbm}'
        
        `);
        if (kbm_results.length > 0) {
          // If there are users, do not delete the class
          connection.release();
          res.send(`<script>alert('Tidak dapat menghapus KBM karena terdapat penilaian terkait!'); window.location.href = '/kbm';</script>`);
        } else {
          // If there are no users, proceed with the class deletion
          await queryPromise(connection, `DELETE from table_kbm where kbm_id='${kbm}'`);
          connection.release();
          res.redirect("/kbm");
        }
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
