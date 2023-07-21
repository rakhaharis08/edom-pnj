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
  async kaprodi(req, res) {
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

      let semester_year = req.session.semesterYear;

      const semesterResults = await queryPromise(connection, `SELECT * from table_semester`);
      const results = await queryPromise(connection, `SELECT * FROM table_user where user_id = '${id}'`);
      const matkulResults = await queryPromise(connection, `SELECT
        table_matkul.matkul_name,
        table_kelas.kelas_name,
        (AVG(table_answer.q1) + AVG(table_answer.q2) + AVG(table_answer.q3) + AVG(table_answer.q4) + AVG(table_answer.q5) + AVG(table_answer.q6) + AVG(table_answer.q7) + AVG(table_answer.q8) + AVG(table_answer.q9) + AVG(table_answer.q10) + AVG(table_answer.q11) + AVG(table_answer.q12) + AVG(table_answer.q13) + AVG(table_answer.q14) + AVG(table_answer.q15) + AVG(table_answer.q16) + AVG(table_answer.q17) + AVG(table_answer.q18) + AVG(table_answer.q19) + AVG(table_answer.q20) + AVG(table_answer.q21) + AVG(table_answer.q22) + AVG(table_answer.q23) + AVG(table_answer.q24) + AVG(table_answer.q25) + AVG(table_answer.q26) + AVG(table_answer.q27)) / 27 * 20 AS rata_rata_jawaban
      FROM
          table_kaprodi
          JOIN table_kelas ON table_kaprodi.kaprodi_prodi = table_kelas.kelas_prodi
          JOIN table_kbm ON table_kbm.kbm_kelas = table_kelas.kelas_id
          JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
          JOIN table_answer ON table_answer.answer_matkul = table_matkul.matkul_id
      WHERE
          table_kaprodi.kaprodi_user = '${id}' and
          table_answer.answer_semester ='${semester_year}' 
      GROUP BY
          table_matkul.matkul_name,
          table_kelas.kelas_name`);

      const matkulName = matkulResults.map((result) => result.matkul_name);
      const rataRataJawaban = matkulResults.map((result) => result.rata_rata_jawaban);

      const chartData = {
        labels: matkulName.map(name => name.toUpperCase()),
        datasets: [{
          label: 'Rata Rata Penilaian dalam Persen',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data: rataRataJawaban.map(jawaban => parseFloat(jawaban).toFixed(2))
        }]
      };

      res.render("kaprodi", {
        url: generateURLWithToken,
        user_name: req.session.username,
        chartData: JSON.stringify(chartData), // Mengirim data grafik ke views
        matkul_name: matkulName,
        semester_year: semester_year,
        semester_semester: semesterResults,
        kelas_name: matkulResults.map(result => result.kelas_name),
        rata_rata_jawaban: rataRataJawaban
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },

  async kaprodi_semester(req, res) {
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

        const semesterResults = await queryPromise(connection, `SELECT * from table_semester`);
        const results = await queryPromise(connection, `SELECT * FROM table_user where user_id = '${id}'`);
        const matkulResults = await queryPromise(connection, `SELECT
          table_matkul.matkul_name,
          table_kelas.kelas_name,
          (AVG(table_answer.q1) + AVG(table_answer.q2) + AVG(table_answer.q3) + AVG(table_answer.q4) + AVG(table_answer.q5) + AVG(table_answer.q6) + AVG(table_answer.q7) + AVG(table_answer.q8) + AVG(table_answer.q9) + AVG(table_answer.q10) + AVG(table_answer.q11) + AVG(table_answer.q12) + AVG(table_answer.q13) + AVG(table_answer.q14) + AVG(table_answer.q15) + AVG(table_answer.q16) + AVG(table_answer.q17) + AVG(table_answer.q18) + AVG(table_answer.q19) + AVG(table_answer.q20) + AVG(table_answer.q21) + AVG(table_answer.q22) + AVG(table_answer.q23) + AVG(table_answer.q24) + AVG(table_answer.q25) + AVG(table_answer.q26) + AVG(table_answer.q27)) / 27 * 20 AS rata_rata_jawaban
        FROM
            table_kaprodi
            JOIN table_kelas ON table_kaprodi.kaprodi_prodi = table_kelas.kelas_prodi
            JOIN table_kbm ON table_kbm.kbm_kelas = table_kelas.kelas_id
            JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
            JOIN table_answer ON table_answer.answer_matkul = table_matkul.matkul_id
        WHERE
            table_kaprodi.kaprodi_user = '${id}' and
            table_answer.answer_semester ='${semester_year}'
        GROUP BY
            table_matkul.matkul_name,
            table_kelas.kelas_name`);

        const matkulName = matkulResults.map((result) => result.matkul_name);
        const rataRataJawaban = matkulResults.map((result) => result.rata_rata_jawaban);

        const chartData = {
          labels: matkulName.map(name => name.toUpperCase()),
          datasets: [{
            label: 'Rata Rata Penilaian dalam Persen',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: rataRataJawaban.map(jawaban => parseFloat(jawaban).toFixed(2))
          }]
        };

        res.render("kaprodi", {
          url: generateURLWithToken,
          user_name: req.session.username,
          chartData: JSON.stringify(chartData), // Mengirim data grafik ke views
          matkul_name: matkulName,
          semester_semester: semesterResults,
          semester_year: semester_year,
          kelas_name: matkulResults.map(result => result.kelas_name),
          rata_rata_jawaban: rataRataJawaban
        });

        connection.release();
      } catch (error) {
        // Tangani jika token tidak valid
        res.status(401).send('Token tidak valid');
      }
    } catch (error) {
      throw error;
    }
  }
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
function generateURLWithToken(semester_year) {
  const token = jwt.sign({ semester_year }, secretKey);
  return `https://beautiful-pink-scarab.cyclic.app/kaprodi_semester?token=${token}`;
}

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

