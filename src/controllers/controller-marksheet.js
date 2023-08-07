const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    async marksheet(req, res) {
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
    
          res.render("marksheet", {
            url: 'http://localhost:5050/',
            userName: req.session.username,
            userid : id,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],
            semester_semester: semesterResults
          });
    
          connection.release();
        } catch (error) {
          throw error;
        }
      },
      async addmarksheet(req, res) {
        try {
          const id = req.session.userid;
          const semester = req.body.semester;
                
          if (semester) {
            const connection = await new Promise((resolve, reject) => {
              pool.getConnection((err, conn) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(conn);
                }
              });
            });
      
            const result = await queryPromise(connection, `
              SELECT
                u.user_id,
                u.user_name,
                COUNT(kbm.kbm_id) AS jumlah_kbm_diikuti,
                COUNT(DISTINCT a.answer_dosen) AS jumlah_dosen_dinilai
              FROM
                table_user u
              LEFT JOIN table_kelas k ON u.user_kelas = k.kelas_id
              LEFT JOIN table_kbm kbm ON u.user_kelas = kbm.kbm_kelas
              LEFT JOIN table_answer a ON kbm.kbm_dosen = a.answer_dosen AND kbm.kbm_matkul = a.answer_matkul AND kbm.kbm_semester = a.answer_semester
              WHERE
                kbm.kbm_semester = '${semester}' AND
                u.user_id = '${id}'
              GROUP BY u.user_id, u.user_name;
            `);

   
            if (result.length > 0) {
              const jumlahKBM = result[0].jumlah_kbm_diikuti;
              const jumlahDosenDinilai = result[0].jumlah_dosen_dinilai;
      
              // Kondisi jika jumlahKBM sama dengan jumlahDosenDinilai
              if (jumlahKBM === jumlahDosenDinilai) {
                res.redirect("/link-marksheet"); // Ganti "/link-marksheet" dengan URL yang sesuai untuk marksheet
              } else {
                res.redirect("/not-completed");
              }
            } else {
              // Handle the case when there are no results, e.g., show an error message or redirect to a different page
              res.redirect("/no-results"); // Replace "/no-results" with the appropriate URL for handling no results
            }
      
            connection.release();
          } else {
            res.redirect("/add-prodi");
            res.end();
          }
        } catch (error) {
          throw error;
        }
      },
      async linkmarksheet(req, res) {
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
    
          res.render("bukti-edom", {
            url: 'http://localhost:5050/',
            userName: req.session.username,
            userid : id,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],
          });
    
          connection.release();
        } catch (error) {
          throw error;
        }
      }, 
      async pdf(req, res) {
        try {
          const id = req.session.userid;
          const semester =req.session.semesterYear
          const mahasiswa = req.query.mahasiswa;
          const connection = await new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
              if (err) {
                reject(err);
              } else {
                resolve(conn);
              }
            });
          });
    
          const results = await queryPromise(connection, `SELECT * FROM table_user WHERE user_id = ${mahasiswa}`);

          
          let semester_year = req.session.semesterYear
    
          const semesterResults = await queryPromise(connection, `SELECT * FROM table_semester where semester_id= ${semester_year}`);
          const kbmResults = await queryPromise(connection, `
          SELECT 
                dosen_id, 
                dosen_name, 
                matkul_name,
                matkul_id,
                kelas_name,
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
            WHERE 
                table_user.user_id = ${mahasiswa} AND
                table_kbm.kbm_semester = ${semester_year}
            GROUP BY 
                dosen_id, 
                dosen_name,
                matkul_name,
                matkul_id,
                kelas_name;
            
          `);
          res.render("pdf", {
            url: 'http://localhost:5050/',
            userName: req.session.username,
            userid : id,
            semester : semester,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],                    
            dosen_name: kbmResults, // Change the key to dosen_names and assign the entire results object
            matkul_name : kbmResults,
            semester_semester : semesterResults,
          });
    
          connection.release();
        } catch (error) {
          throw error;
        }
      },
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