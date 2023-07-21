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
            url: 'https://beautiful-pink-scarab.cyclic.app/',
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
                res.redirect("/ada-tapi-kosong");
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
            url: 'https://beautiful-pink-scarab.cyclic.app/',
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