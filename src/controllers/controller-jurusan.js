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
            url: 'https://beautiful-pink-scarab.cyclic.app',
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
            url: 'https://beautiful-pink-scarab.cyclic.app',
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
  }
}
