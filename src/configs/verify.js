const mysql = require('mysql');
const dbConfig = {
    host                : 'bsvvvqfjx0qfkq4sewhu-mysql.services.clever-cloud.com',
    user                : 'u9gceim0rieilj5t',
    password            : 'PQXuecc7MTvgvlJHp4vD',
    database            : 'bsvvvqfjx0qfkq4sewhu'
};

const connection = mysql.createConnection(dbConfig);

module.exports = {
    isLogin(req, res, next){
        if(req.session.loggedin === true){
            next();
            return;
        } else {
            req.session.destroy(function(err) {
                res.redirect('/login');
            })
        }
    },
    isLogout(req, res, next){
        if(req.session.loggedin !== true){
            next();
            return;
        }
        res.redirect('/');
    },
    isUser(req, res, next) {
        const userId = req.session.userid; // Anda perlu memiliki session.userId yang menyimpan ID pengguna saat login
        if (!userId) {
          res.redirect('/login'); // Pengguna tidak masuk, arahkan ke halaman login
          return;
        }
    
        // Query ke database untuk memeriksa user_role
        const query = 'SELECT user_role FROM table_user WHERE user_id = ?';
        connection.query(query, [userId], (error, results) => {
          if (error) throw error;
    
          const userRole = results[0].user_role;
          if (userRole === 'Mahasiswa') {
            next(); // Pengguna memiliki role Mahasiswa, lanjutkan
          } else {
            res.redirect('/unauthorized'); // Pengguna memiliki role selain Mahasiswa, arahkan ke halaman tidak diizinkan
          }
        });
      },
      isDosen(req, res, next) {
        const userId = req.session.userid; // Anda perlu memiliki session.userId yang menyimpan ID pengguna saat login
        if (!userId) {
          res.redirect('/login'); // Pengguna tidak masuk, arahkan ke halaman login
          return;
        }
    
        // Query ke database untuk memeriksa user_role
        const query = 'SELECT user_role FROM table_user WHERE user_id = ?';
        connection.query(query, [userId], (error, results) => {
          if (error) throw error;
    
          const userRole = results[0].user_role;
          if (userRole === 'dosen') {
            next(); // Pengguna memiliki role Mahasiswa, lanjutkan
          } else {
            res.redirect('/unauthorized'); // Pengguna memiliki role selain Mahasiswa, arahkan ke halaman tidak diizinkan
          }
        });
      },
      isKaprodi(req, res, next) {
        const userId = req.session.userid; // Anda perlu memiliki session.userId yang menyimpan ID pengguna saat login
        if (!userId) {
          res.redirect('/login'); // Pengguna tidak masuk, arahkan ke halaman login
          return;
        }
    
        // Query ke database untuk memeriksa user_role
        const query = 'SELECT user_role FROM table_user WHERE user_id = ?';
        connection.query(query, [userId], (error, results) => {
          if (error) throw error;
    
          const userRole = results[0].user_role;
          if (userRole === 'kaprodi') {
            next(); // Pengguna memiliki role Mahasiswa, lanjutkan
          } else {
            res.redirect('/unauthorized'); // Pengguna memiliki role selain Mahasiswa, arahkan ke halaman tidak diizinkan
          }
        });
      },
      isKajur(req, res, next) {
        const userId = req.session.userid; // Anda perlu memiliki session.userId yang menyimpan ID pengguna saat login
        if (!userId) {
          res.redirect('/login'); // Pengguna tidak masuk, arahkan ke halaman login
          return;
        }
    
        // Query ke database untuk memeriksa user_role
        const query = 'SELECT user_role FROM table_user WHERE user_id = ?';
        connection.query(query, [userId], (error, results) => {
          if (error) throw error;
    
          const userRole = results[0].user_role;
          if (userRole === 'kajur') {
            next(); // Pengguna memiliki role Mahasiswa, lanjutkan
          } else {
            res.redirect('/unauthorized'); // Pengguna memiliki role selain Mahasiswa, arahkan ke halaman tidak diizinkan
          }
        });
      },
      isAdmin(req, res, next) {
        const userId = req.session.userid; // Anda perlu memiliki session.userId yang menyimpan ID pengguna saat login
        if (!userId) {
          res.redirect('/login'); // Pengguna tidak masuk, arahkan ke halaman login
          return;
        }
    
        // Query ke database untuk memeriksa user_role
        const query = 'SELECT user_role FROM table_user WHERE user_id = ?';
        connection.query(query, [userId], (error, results) => {
          if (error) throw error;
    
          const userRole = results[0].user_role;
          if (userRole === 'admin') {
            next(); // Pengguna memiliki role Mahasiswa, lanjutkan
          } else {
            res.redirect('/unauthorized'); // Pengguna memiliki role selain Mahasiswa, arahkan ke halaman tidak diizinkan
          }
        });
      }
};