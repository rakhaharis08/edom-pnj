// Definisikan configurasi Database
const config = require('../configs/database');
// Gunakan library mysql
let mysql      = require('mysql');
// Buat koneksi
let pool       = mysql.createPool(config);

// Kirim error jika koneksi gagal
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Fungsi untuk merender file register yang ada pada folder 'src/views/register.ejs'
    formRegister(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_kelas;
                `
            , function (error, results) {
                if(error) throw error;
                res.render("register",{
                    url: 'http://localhost:5050/',
                    userName: req.session.username,
                    kelas_id: results,
                    kelas_name: results
                });
            });
            connection.release();
        })
    },

    // Fungsi untuk menyimpan data
    saveRegister(req,res){
        // Tampung inputan user kedalam varibel username, email dan password
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        let kelas = req.body.kelas;
        // Pastikan semua varibel terisi
        if (username && email && password && kelas) {
            // Panggil koneksi dan eksekusi query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO table_user (user_name,user_email,user_password,user_kelas) VALUES (?,?,SHA2(?,512),?);`
                , [username, email, password,kelas],function (error, results) {
                    if (error) throw error;
                    // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    // Kembali kehalaman login
                    res.redirect('/login');
                });
                // Koneksi selesai
                connection.release();
            })
        } else {
            // Kondisi apabila variabel username, email dan password tidak terisi
            res.redirect('/login');
            res.end();
        }
    }
}