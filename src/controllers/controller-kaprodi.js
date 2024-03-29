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
      const semester_now = await queryPromise(connection, `SELECT * from table_semester where semester_id='${semester_year}'`);
      const prodiResults = await queryPromise(connection, `
      SELECT table_prodi.prodi_name from table_user 
      JOIN table_kaprodi ON table_user.user_id = table_kaprodi.kaprodi_user
      JOIN table_prodi ON table_kaprodi.kaprodi_prodi=table_prodi.prodi_id
      where table_user.user_id='${id}'`);
      const semesterResults = await queryPromise(connection, `SELECT * from table_semester`);
      const results = await queryPromise(connection, `SELECT * FROM table_user where user_id = '${id}'`);
      const kelasResults = await queryPromise(connection, `
      SELECT
        CONCAT(table_prodi.prodi_name, '-', table_kelas.kelas_semester, '-', table_kelas.kelas_subkelas) AS kelas_name,
        table_kelas.kelas_prodi, table_matkul.matkul_name as matkul_name,
        (AVG(table_answer.q1) + AVG(table_answer.q2) + AVG(table_answer.q3) + AVG(table_answer.q4) + AVG(table_answer.q5) + AVG(table_answer.q6) + AVG(table_answer.q7) + AVG(table_answer.q8) + AVG(table_answer.q9) + AVG(table_answer.q10) + AVG(table_answer.q11) + AVG(table_answer.q12) + AVG(table_answer.q13) + AVG(table_answer.q14) + AVG(table_answer.q15) + AVG(table_answer.q16) + AVG(table_answer.q17) + AVG(table_answer.q18) + AVG(table_answer.q19) + AVG(table_answer.q20) + AVG(table_answer.q21) + AVG(table_answer.q22) + AVG(table_answer.q23) + AVG(table_answer.q24) + AVG(table_answer.q25) + AVG(table_answer.q26) + AVG(table_answer.q27)) / 27 * 20 AS rata_rata_jawaban
    FROM
        table_answer
        JOIN table_user ON table_answer.answer_user = table_user.user_id
        JOIN table_kelas ON table_user.user_kelas = table_kelas.kelas_id
		    JOIN table_matkul ON table_answer.answer_matkul = table_matkul.matkul_id
        JOIN table_prodi ON table_kelas.kelas_prodi = table_prodi.prodi_id
        JOIN table_kaprodi ON table_prodi.prodi_id = table_kaprodi.kaprodi_prodi
      WHERE
        table_kaprodi.kaprodi_user = '${id}' and
        table_answer.answer_semester ='${semester_year}'
    GROUP BY
        matkul_name;
      `);

      const rataRataJawaban = kelasResults.map((result) => result.rata_rata_jawaban);

      const kelasResults2 = await queryPromise(connection, `
      SELECT
      CONCAT(table_prodi.prodi_name, '-', table_kelas.kelas_semester, '-', table_kelas.kelas_subkelas) AS kelas_name,
      AVG((table_answer.q1+table_answer.q2+table_answer.q3+table_answer.q4+table_answer.q5+table_answer.q6+table_answer.q7+table_answer.q8+table_answer.q9+table_answer.q10+table_answer.q11+table_answer.q12+table_answer.q13+table_answer.q14+table_answer.q15+table_answer.q16+table_answer.q17+table_answer.q18+table_answer.q19+table_answer.q20+table_answer.q21+table_answer.q22+table_answer.q23+table_answer.q24+table_answer.q25+table_answer.q26+table_answer.q27)/27*20) AS rata_rata_jawaban
      FROM
          table_answer
      JOIN table_user ON table_answer.answer_user = table_user.user_id
      JOIN table_kelas ON table_user.user_kelas = table_kelas.kelas_id
      JOIN table_prodi ON table_kelas.kelas_prodi = table_prodi.prodi_id
      JOIN table_kaprodi ON table_prodi.prodi_id = table_kaprodi.kaprodi_prodi
      WHERE
            table_kaprodi.kaprodi_user = '${id}' and
            table_answer.answer_semester ='${semester_year}'
      GROUP BY
          table_kelas.kelas_id
    `);

      const kelasName2 = kelasResults2.map((result) => result.kelas_name);
      const rataRataJawaban2 = kelasResults2.map((result) => result.rata_rata_jawaban);

      const chartData = {
        labels: kelasName2.map(name => name.toUpperCase()),
        datasets: [{
          label: 'Rata Rata Penilaian dalam Persen',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data: rataRataJawaban2.map(jawaban => parseFloat(jawaban).toFixed(2))
        }]
      };

      res.render("kaprodi", {
        url: generateURLWithToken,
        user_name: req.session.username,
        chartData: JSON.stringify(chartData), // Mengirim data grafik ke views
        kelasResults: kelasResults,
        semester_now: semester_now,
        prodi_name : prodiResults,
        semester_semester: semesterResults,
        kelas_prodi: kelasResults.map(result => result.kelas_prodi),
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
        
        const prodiResults = await queryPromise(connection, `
        SELECT table_prodi.prodi_name from table_user 
        JOIN table_kaprodi ON table_user.user_id = table_kaprodi.kaprodi_user
        JOIN table_prodi ON table_kaprodi.kaprodi_prodi=table_prodi.prodi_id
        where table_user.user_id='${id}'`);
        const semesterResults = await queryPromise(connection, `SELECT * from table_semester`);
        const semester_now = await queryPromise(connection, `SELECT * from table_semester where semester_id='${semester_year}'`);
        const results = await queryPromise(connection, `SELECT * FROM table_user where user_id = '${id}'`);
        const kelasResults = await queryPromise(connection, `SELECT
          CONCAT(table_prodi.prodi_name, '-', table_kelas.kelas_semester, '-', table_kelas.kelas_subkelas) AS kelas_name,
          table_kelas.kelas_prodi, table_matkul.matkul_name as matkul_name,
          (AVG(table_answer.q1) + AVG(table_answer.q2) + AVG(table_answer.q3) + AVG(table_answer.q4) + AVG(table_answer.q5) + AVG(table_answer.q6) + AVG(table_answer.q7) + AVG(table_answer.q8) + AVG(table_answer.q9) + AVG(table_answer.q10) + AVG(table_answer.q11) + AVG(table_answer.q12) + AVG(table_answer.q13) + AVG(table_answer.q14) + AVG(table_answer.q15) + AVG(table_answer.q16) + AVG(table_answer.q17) + AVG(table_answer.q18) + AVG(table_answer.q19) + AVG(table_answer.q20) + AVG(table_answer.q21) + AVG(table_answer.q22) + AVG(table_answer.q23) + AVG(table_answer.q24) + AVG(table_answer.q25) + AVG(table_answer.q26) + AVG(table_answer.q27)) / 27 * 20 AS rata_rata_jawaban
        FROM
          table_kaprodi
          JOIN table_kelas ON table_kaprodi.kaprodi_prodi = table_kelas.kelas_prodi
          JOIN table_kbm ON table_kbm.kbm_kelas = table_kelas.kelas_id
          JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
          JOIN table_answer ON table_answer.answer_matkul = table_matkul.matkul_id
          JOIN table_prodi ON table_prodi.prodi_id = table_kelas.kelas_prodi
        WHERE
          table_kaprodi.kaprodi_user = '${id}' and
          table_answer.answer_semester ='${semester_year}' 
        GROUP BY
          matkul_name`);
  
        const rataRataJawaban = kelasResults.map((result) => result.rata_rata_jawaban);
  
        const kelasResults2 = await queryPromise(connection, `
        SELECT
        CONCAT(table_prodi.prodi_name, '-', table_kelas.kelas_semester, '-', table_kelas.kelas_subkelas) AS kelas_name,
        AVG((table_answer.q1+table_answer.q2+table_answer.q3+table_answer.q4+table_answer.q5+table_answer.q6+table_answer.q7+table_answer.q8+table_answer.q9+table_answer.q10+table_answer.q11+table_answer.q12+table_answer.q13+table_answer.q14+table_answer.q15+table_answer.q16+table_answer.q17+table_answer.q18+table_answer.q19+table_answer.q20+table_answer.q21+table_answer.q22+table_answer.q23+table_answer.q24+table_answer.q25+table_answer.q26+table_answer.q27)/27*20) AS rata_rata_jawaban
        FROM
            table_answer
        JOIN table_user ON table_answer.answer_user = table_user.user_id
        JOIN table_kelas ON table_user.user_kelas = table_kelas.kelas_id
        JOIN table_prodi ON table_kelas.kelas_prodi = table_prodi.prodi_id
        JOIN table_kaprodi ON table_prodi.prodi_id = table_kaprodi.kaprodi_prodi
        WHERE
              table_kaprodi.kaprodi_user = '${id}' and
              table_answer.answer_semester ='${semester_year}'
        GROUP BY
            table_kelas.kelas_id
      `);
  
        const kelasName2 = kelasResults2.map((result) => result.kelas_name);
        const rataRataJawaban2 = kelasResults2.map((result) => result.rata_rata_jawaban);
  
        const chartData = {
          labels: kelasName2.map(name => name.toUpperCase()),
          datasets: [{
            label: 'Rata Rata Penilaian dalam Persen',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: rataRataJawaban2.map(jawaban => parseFloat(jawaban).toFixed(2))
          }]
        };

        res.render("kaprodi", {
          url: generateURLWithToken,
          userid: req.session.userid,
          user_name: req.session.username,
          prodi_name:prodiResults,
          chartData: JSON.stringify(chartData), // Mengirim data grafik ke views
          kelasResults: kelasResults,
          semester_semester: semesterResults,
          semester_now: semester_now,
          kelas_prodi: kelasResults.map(result => result.kelas_prodi),
          rata_rata_jawaban: rataRataJawaban,
          

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

function generateURLWithToken(semester_year, id) {
  const token = jwt.sign({ semester_year, id }, secretKey);
  return `http://localhost:5050/kaprodi_semester?token=${token}`;
}


function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}