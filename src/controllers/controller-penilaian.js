const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    penilaian(req,res){
        const dosenId = req.query.dosen_id;
        const userId = req.query.user_id;
        let id = req.session.userid
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user where user_id = '${id}';
                `
            , function (error, results) {
                if(error) throw error;
                res.render("penilaian",{
                    url: 'http://localhost:5050/',
                    userName: req.session.username,
                    nama: results[0]['user_name'],
                    email: results[0]['user_email'],
                    dosen_id: dosenId,
                    user_id : userId
                });
            });
            connection.release();
        })
    },
    
    savepenilaian(req, res) {
        // Tampung inputan user kedalam varibel username, email dan password
        let q1 = req.body.q1;
        let q2 = req.body.q2;
        let q3 = req.body.q3;
        let q4 = req.body.q4;
        let q5 = req.body.q5;
        let dosen_id = req.body.dosen_id;
        let user_id = req.body.user_id;
        // Pastikan semua varibel terisi
        if (q1 && q2 && q3 && q4 && q5 && dosen_id && user_id) {
            // Panggil koneksi dan eksekusi query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO table_question (q1,q2,q3,q4,q5,question_dosen,question_user) VALUES (?,?,?,?,?,?,?);`
                , [q1, q2, q3, q4, q5, dosen_id, user_id],function (error, results) {
                    if (error) throw error;
                    // // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
                    // req.flash('color', 'success');
                    // req.flash('status', 'Yes..');
                    // req.flash('message', 'Registrasi berhasil');
                    // Kembali kehalaman login
                    res.redirect('/');
                });
                // Koneksi selesai
                connection.release();
            })
        } else {
            // Kondisi apabila variabel username, email dan password tidak terisi
            res.redirect('/profile');
            res.end();
        }
    }
    
    

}
