const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    async admin(req, res) {
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
          
          const averages = [];
          const results = await queryPromise(connection, `SELECT * FROM table_user where user_id = '${id}'`);
          const ratarataResults = await queryPromise(connection, `
          SELECT 
          avg(q1) as q1,
          avg(q2) as q2,
          avg(q3) as q3,
          avg(q4) as q4,
          avg(q5) as q5,
          avg(q6) as q6,
          avg(q7) as q7,
          avg(q8) as q8,
          avg(q9) as q9,
          avg(q10) as q10,
          avg(q11) as q11,
          avg(q12) as q12,
          avg(q13) as q13,
          avg(q14) as q14,
          avg(q15) as q15,
          avg(q16) as q16,
          avg(q17) as q17,
          avg(q18) as q18,
          avg(q19) as q19,
          avg(q20) as q20,
          avg(q21) as q21,
          avg(q22) as q22,
          avg(q23) as q23,
          avg(q24) as q24,
          avg(q25) as q25,
          avg(q26) as q26,
          avg(q27) as q27
          FROM table_answer
          WHERE answer_semester ='${semester_year}';
          `);
          const row = ratarataResults[0];
          for (let i = 1; i <= 27; i++) {
            averages.push(row[`q${i}`]);
          }
          
            const averageData = ratarataResults[0];
            res.render("admin",{
            url: 'http://localhost:5050/',
            userName: req.session.username,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],
            rata_rata :ratarataResults,
            averageData: averageData
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
 