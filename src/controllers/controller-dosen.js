const config = require('../configs/database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const pool = mysql.createPool(config);
const secretKey = generateSecretKey();

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async dosen(req, res) {
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

      const averages = [];
      const questionResults = await queryPromise(connection, 'SELECT * FROM table_question');
      const semesterResults = await queryPromise(connection, 'SELECT * FROM table_semester');
      let semester_year = req.session.semesterYear
      const semester_now = await queryPromise(connection, `SELECT * from table_semester where semester_id='${semester_year}'`);
      
      const results = await queryPromise(connection, `SELECT dosen_id FROM table_dosen WHERE dosen_user='${id}'`);
      const dosenId = results[0]['dosen_id'];

      const totalResults = await queryPromise(connection , `SELECT (AVG(q1+q2+q3+q4+q5+q6+q7+q8+q9+q10+q11+q12+q13+q14+q15+q16+q17+q18+q19+q20+q21+q22+q23+q24+q25+q26+q27))/27*20 AS rata_rata_total FROM table_answer where answer_dosen='${dosenId}'`);
      const averageResults = await queryPromise(connection, `SELECT AVG(q1) AS avg_q1, AVG(q2) AS avg_q2, AVG(q3) AS avg_q3, AVG(q4) AS avg_q4, AVG(q5) AS avg_q5, AVG(q6) AS avg_q6, AVG(q7) AS avg_q7, AVG(q8) AS avg_q8, AVG(q9) AS avg_q9, AVG(q10) AS avg_q10, AVG(q11) AS avg_q11, AVG(q12) AS avg_q12, AVG(q13) AS avg_q13, AVG(q14) AS avg_q14, AVG(q15) AS avg_q15, AVG(q16) AS avg_q16, AVG(q17) AS avg_q17, AVG(q18) AS avg_q18, AVG(q19) AS avg_q19, AVG(q20) AS avg_q20, AVG(q21) AS avg_q21, AVG(q22) AS avg_q22, AVG(q23) AS avg_q23, AVG(q24) AS avg_q24, AVG(q25) AS avg_q25, AVG(q26) AS avg_q26, AVG(q27) AS avg_q27 FROM table_answer WHERE answer_dosen='${dosenId}' and answer_semester='${semester_year}'`);
      
      const row = averageResults[0];
      for (let i = 1; i <= 27; i++) {
        averages.push(row[`avg_q${i}`]);
      }

      const averageData = averageResults[0];

      res.render("dosen", {
        url: generateURLWithToken,
        dosen_name: results[0]['dosen_name'],
        dosen_id: dosenId,
        average_percentage: averageResults,
        question_question: questionResults,
        user_name: req.session.username,
        semester_semester: semesterResults,
        total_total: totalResults,
        semester_now: semester_now,
        averages: averages,
        averageData: averageData
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },
async dosen_semester(req, res) {
  try {
    const id = req.session.userid;
    const token = req.query.token;

    try {
      const decoded = jwt.verify(token, secretKey);
      const { semester_year } = decoded;

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
      const questionResults = await queryPromise(connection, 'SELECT * FROM table_question');
      const semesterResults = await queryPromise(connection, 'SELECT * FROM table_semester');
      const semester_now = await queryPromise(connection, `SELECT * from table_semester where semester_id='${semester_year}'`);

      const results = await queryPromise(connection, `SELECT dosen_id FROM table_dosen WHERE dosen_user='${id}'`);
      const dosenId = results[0]['dosen_id'];

      const averageResults = await queryPromise(connection, `SELECT AVG(q1) AS avg_q1, AVG(q2) AS avg_q2, AVG(q3) AS avg_q3, AVG(q4) AS avg_q4, AVG(q5) AS avg_q5, AVG(q6) AS avg_q6, AVG(q7) AS avg_q7, AVG(q8) AS avg_q8, AVG(q9) AS avg_q9, AVG(q10) AS avg_q10, AVG(q11) AS avg_q11, AVG(q12) AS avg_q12, AVG(q13) AS avg_q13, AVG(q14) AS avg_q14, AVG(q15) AS avg_q15, AVG(q16) AS avg_q16, AVG(q17) AS avg_q17, AVG(q18) AS avg_q18, AVG(q19) AS avg_q19, AVG(q20) AS avg_q20, AVG(q21) AS avg_q21, AVG(q22) AS avg_q22, AVG(q23) AS avg_q23, AVG(q24) AS avg_q24, AVG(q25) AS avg_q25, AVG(q26) AS avg_q26, AVG(q27) AS avg_q27 FROM table_answer WHERE answer_dosen='${dosenId}' and answer_semester='${semester_year}'`);
      const totalResults = await queryPromise(connection , `SELECT (AVG(q1+q2+q3+q4+q5+q6+q7+q8+q9+q10+q11+q12+q13+q14+q15+q16+q17+q18+q19+q20+q21+q22+q23+q24+q25+q26+q27))/27*20 AS rata_rata_total FROM table_answer where answer_dosen='${dosenId}'`);
      const row = averageResults[0];
      for (let i = 1; i <= 27; i++) {
        averages.push(row[`avg_q${i}`]);
      }

      const averageData = averageResults[0];

      res.render("dosen", {
        url: generateURLWithToken,
        dosen_name: results[0]['dosen_name'],
        dosen_id: dosenId,
        user_name: req.session.username,
        average_percentage: averageResults,
        question_question: questionResults,
        semester_semester: semesterResults,
        total_total: totalResults,
        semester_now: semester_now,
        averages: averages,
        averageData: averageData
      });

      connection.release();
    } catch (error) {
      // Handle invalid token
      res.status(401).send('Invalid token');
    }
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

// ... (previous code)

function generateURLWithToken(semester_year) {
  const token = jwt.sign({ semester_year }, secretKey);
  return `http://localhost:5050/dosen_semester?token=${token}`;
}

// ... (rest of the code)


function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}
