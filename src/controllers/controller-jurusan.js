const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  jurusan(req, res) {
    let id = req.session.userid;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT * FROM table_user WHERE user_id = '${id}';
        `
      , function (error, results) {
        if (error) throw error;
        
        connection.query(
          `
          SELECT * FROM table_jurusan;
          `
        , function (error, jurusanResults) {
          if (error) throw error;
          
          res.render("jurusan", {
            url: 'http://localhost:5050/',
            userName: req.session.username,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],
            jurusan_jurusan : jurusanResults

          });
        });

        connection.release();
      });
    });
  },
  addJurusan(req, res) {
    let id = req.session.userid;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT * FROM table_user WHERE user_id = '${id}';
        `
      , function (error, results) {
        if (error) throw error;
        
        connection.query(
          `
          SELECT * FROM table_jurusan;
          `
        , function (error, jurusanResults) {
          if (error) throw error;
          
          res.render("addJurusan", {
            url: 'http://localhost:5050/',
            userName: req.session.username,
            nama: results[0]['user_name'],
            email: results[0]['user_email'],
            jurusan: jurusanResults.map((jurusan) => jurusan['jurusan_name'].toUpperCase())

          });
        });

        connection.release();
      });
    });
  },
  savejurusan(req, res) {
    // Tampung inputan user kedalam variabel q1 hingga q27
    let jurusan= req.body.jurusan;
    // Pastikan semua variabel terisi
    if (
        jurusan
    ) {
      // Panggil koneksi dan eksekusi query
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          "INSERT INTO table_jurusan (jurusan_name) VALUES (?)",
          [
            jurusan,
          ],
          function (error, results) {
            if (error) throw error;
            // Kembali ke halaman login
            res.redirect("/jurusan");
          }
        );
        // Koneksi selesai
        connection.release();
      });
    } else {
      // Kondisi apabila variabel q1 hingga q27, dosen_id, dan user_id tidak terisi
      res.redirect("/addd-jurusan");
      res.end();
    }
  },
  async hapusjurusan(req, res) {
    try {
      const jurusan = req.query.id;
      if (jurusan) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
        
    
        const jurusan_results = await queryPromise(connection, `SELECT * FROM table_prodi WHERE prodi_jurusan = '${jurusan}'`);
        if (jurusan_results.length > 0) {
          // If there are users, do not delete the class
          connection.release();
          res.send(`<script>alert('Tidak dapat menghapus jurusan karena terdapat prodi terkait!'); window.location.href = '/jurusan';</script>`);
        } else {
          // If there are no users, proceed with the class deletion
          await queryPromise(connection, `DELETE from table_jurusan where jurusan_id='${jurusan}'`);
          connection.release();
          res.redirect("/jurusan");
        }
      } else {
        res.redirect("/add-juruasn");
        res.end();
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
