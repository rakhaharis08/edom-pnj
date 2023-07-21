const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
    login(req,res){
        res.render("login",{
            url : 'https://beautiful-pink-scarab.cyclic.app',
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req, res) {
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
          pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
              `SELECT * FROM table_user WHERE user_email = ? AND user_password = SHA2(?,512)`,
              [email, password],
              function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                  // Jika data ditemukan, set sesi user tersebut menjadi true
                  req.session.loggedin = true;
                  req.session.userid = results[0].user_id;
                  req.session.username = results[0].user_name;
                  req.session.userkelas = results[0].user_kelas;
                  req.session.role = results[0].user_role;
      
                  // Tambahkan query baru
                  let query = `SELECT * FROM table_semester WHERE semester_status = 1`;
                  connection.query(query, function (error, semesterResults) {
                    if (error) throw error;
      
                    if (semesterResults.length > 0) {
                      // Ambil nilai semester_year dan semester_gage dari hasil query
                      let semesterYear = semesterResults[0].semester_id;
      
                      // Tambahkan field baru ke dalam sesi
                      req.session.semesterYear = semesterYear;
                    }
      
                    // Redirect berdasarkan peran (role) pengguna
                    if (results[0].user_role === 'dosen') {
                      res.redirect('/dosen');
                    } else if (results[0].user_role === 'mahasiswa') {
                      res.redirect('/');
                    } else if (results[0].user_role === 'kaprodi') {
                      res.redirect('/kaprodi');
                    } else if (results[0].user_role === 'kajur') {
                      res.redirect('/kajur');
                    } else if (results[0].user_role === 'admin') {
                      res.redirect('/admin');
                    } else {
                      // Jika peran tidak sesuai, Anda dapat melakukan redirect ke halaman lain atau memberikan pesan kesalahan
                      res.redirect('/error');
                    }
                  });
                } else {
                  // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                  req.flash('color', 'danger');
                  req.flash('status', 'Oops..');
                  req.flash('message', 'Akun tidak ditemukan');
                  res.redirect('/login');
                }
              }
            );
            connection.release();
          });
        } else {
          res.redirect('/login');
          res.end();
        }
      },
      
    // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'https://beautiful-pink-scarab.cyclic.applogin/logout'
    logout(req,res){
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}