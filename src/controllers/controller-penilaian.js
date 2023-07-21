const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    penilaian(req, res) {
        const dosenId = req.query.dosen_id;
        const userId = req.query.user_id;
        const matkulId = req.query.matkul_id;
        let id = req.session.userid;
        
        pool.getConnection(function(err, connection) {
          if (err) throw err;
          
          connection.query(
            `
            SELECT * FROM table_user WHERE user_id = '${id}';
            `,
            function(error, userResults) {
              if (error) throw error;
              
              const user = userResults[0];
              
              connection.query(
                `
                SELECT * FROM table_dosen WHERE dosen_id = ${dosenId};
                `,
                function(err, dosenResults) {
                  if (err) throw err;
                  
                  const dosen = dosenResults[0];
                  
                  connection.query(
                    `
                    SELECT * FROM table_question;
                    `,
                    function(err, results) {
                      if (err) throw err;


                      const lastQuestionId = results[results.length - 1]["question_id"];
                      const questionNames = [];
      
                      for (let i = 1; i <= lastQuestionId; i++) {
                        const question_name = `question${i}`;
                        questionNames.push(question_name);
                      }
      
                      
                      res.render("penilaian", {
                        url: "https://beautiful-pink-scarab.cyclic.app/",
                        userName: req.session.username,
                        nama: user["user_name"],
                        email: user["user_email"],
                        dosen_id: dosen["dosen_id"],
                        semesterYear : req.session.semesterYear,
                        semesterGage : req.session.semesterGage,
                        user_id: userId,
                        matkul_id : matkulId,
                        dosen_name: dosen["dosen_name"],
                        question_question: results,
                        question_id: results,
                        question_name: results
                      });
                    }
                  );
                }
              );
              
              connection.release();
            }
          );
        });
      },
      
    
      savepenilaian(req, res) {
        // Tampung inputan user kedalam variabel q1 hingga q27
        let q1 = req.body.question1;
        let q2 = req.body.question2;
        let q3 = req.body.question3;
        let q4 = req.body.question4;
        let q5 = req.body.question5;
        let q6 = req.body.question6;
        let q7 = req.body.question7;
        let q8 = req.body.question8;
        let q9 = req.body.question9;
        let q10 = req.body.question10;
        let q11 = req.body.question11;
        let q12 = req.body.question12;
        let q13 = req.body.question13;
        let q14 = req.body.question14;
        let q15 = req.body.question15;
        let q16 = req.body.question16;
        let q17 = req.body.question17;
        let q18 = req.body.question18;
        let q19 = req.body.question19;
        let q20 = req.body.question20;
        let q21 = req.body.question21;
        let q22 = req.body.question22;
        let q23 = req.body.question23;
        let q24 = req.body.question24;
        let q25 = req.body.question25;
        let q26 = req.body.question26;
        let q27 = req.body.question27;
        let dosen_id = req.body.dosen_id;
        let user_id = req.body.user_id;
        let matkul_id = req.body.matkul_id;
        let semester_year = req.body.semester_year;
        let semester_gage = req.body.semester_gage;
      
        // Pastikan semua variabel terisi
        if (
          q1 &&
          q2 &&
          q3 &&
          q4 &&
          q5 &&
          q6 &&
          q7 &&
          q8 &&
          q9 &&
          q10 &&
          q11 &&
          q12 &&
          q13 &&
          q14 &&
          q15 &&
          q16 &&
          q17 &&
          q18 &&
          q19 &&
          q20 &&
          q21 &&
          q22 &&
          q23 &&
          q24 &&
          q25 &&
          q26 &&
          q27 &&
          dosen_id &&
          user_id &&
          matkul_id &&
          semester_year &&
          semester_gage
        ) {
          // Panggil koneksi dan eksekusi query
          pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
              "INSERT INTO table_answer (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, answer_dosen, answer_user,answer_matkul,answer_semester,answer_gage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                q9,
                q10,
                q11,
                q12,
                q13,
                q14,
                q15,
                q16,
                q17,
                q18,
                q19,
                q20,
                q21,
                q22,
                q23,
                q24,
                q25,
                q26,
                q27,
                dosen_id,
                user_id,
                matkul_id,
                semester_year,
                semester_gage
              ],
              function (error, results) {
                if (error) throw error;
                // Kembali ke halaman login
                res.redirect("/");
              }
            );
            // Koneksi selesai
            connection.release();
          });
        } else {
          // Kondisi apabila variabel q1 hingga q27, dosen_id, dan user_id tidak terisi
          res.redirect("/");
          res.end();
        }
      }
          
    
    

}
