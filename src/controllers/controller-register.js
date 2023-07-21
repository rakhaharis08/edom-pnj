const config = require('../configs/database');
const mysql = require('mysql');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async formRegister(req, res) {
    try {
      const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });

      const results = await queryPromise(connection, `SELECT * FROM table_kelas`);

      res.render("register", {
        url: 'https://beautiful-pink-scarab.cyclic.app/',
        userName: req.session.username,
        kelas_id: results,
        kelas_name: results
      });

      connection.release();
    } catch (error) {
      throw error;
    }
  },

  formRegisterStruktural(req, res) {
    res.render("register-struktural", {
      url: 'https://beautiful-pink-scarab.cyclic.app/',
      colorFlash: req.flash('color'),
      statusFlash: req.flash('status'),
      pesanFlash: req.flash('message'),
    });
  },

  async saveRegister(req, res) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.pass;
      const kelas = req.body.kelas;
      const role = "Mahasiswa";

      if (username && email && password && kelas) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });

        await queryPromise(connection, "INSERT INTO table_user (user_email, user_name, user_password, user_kelas, user_role) VALUES (?, ?, SHA2(?, 512), ?, ?);", [email, username, password, kelas, role]);

        req.flash('color', 'success');
        req.flash('status', 'Yes..');
        req.flash('message', 'Registrasi berhasil');

        res.redirect('/login');

        connection.release();
      } else {
        res.redirect('/login');
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },

  async saveRegisterStruktural(req, res) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.pass;
      const kelas = "0";
      const key = req.body.key;
      const role = req.body.role;
  
      if (username && email && password && kelas) {
        const connection = await new Promise((resolve, reject) => {
          pool.getConnection((err, conn) => {
            if (err) {
              reject(err);
            } else {
              resolve(conn);
            }
          });
        });
  
        // Check if email and key exist in table_auth
        const authQuery = "SELECT * FROM table_auth WHERE auth_email = ? AND auth_key = ?";
        const authResult = await queryPromise(connection, authQuery, [email, key]);
  
        if (authResult.length === 0) {
          // Email and key not found, abort process
          req.flash('color', 'danger');
          req.flash('status', 'No..');
          req.flash('message', 'Registrasi gagal');
          res.redirect('/login');
          connection.release();
          return;
        }
  
        // Insert into table_user
        const userQuery = "INSERT INTO table_user (user_email, user_name, user_password, user_kelas, user_role) VALUES (?, ?, SHA2(?, 512), ?, ?)";
        const userResult = await queryPromise(connection, userQuery, [email, username, password, kelas, role]);
        const userId = userResult.insertId;
  
        if (role === "dosen") {
          const dosenName = username;
  
          // Insert into table_dosen
          const dosenQuery = "INSERT INTO table_dosen (dosen_name, dosen_user) VALUES (?, ?)";
          await queryPromise(connection, dosenQuery, [dosenName, userId]);
        } else if (role === "kaprodi") {
          const kaprodiName = username;
          const prodi = req.body.prodi;
  
          // Insert into table_kaprodi
          const kaprodiQuery = "INSERT INTO table_kaprodi (kaprodi_email, kaprodi_nama, kaprodi_prodi, kaprodi_user) VALUES (?, ?, ?, ?)";
          await queryPromise(connection, kaprodiQuery, [email, kaprodiName, prodi, userId]);
        } else if (role === "kajur") {
          const kajurName = username;
          const jurusan = req.body.jurusan;
  
          // Insert into table_kajur
          const kajurQuery = "INSERT INTO table_kajur (kajur_email, kajur_name, kajur_jurusan, kajur_user) VALUES (?, ?, ?, ?)";
          await queryPromise(connection, kajurQuery, [email, kajurName, jurusan, userId]);
        }
  
        // Delete entry from table_auth
        const deleteAuthQuery = "DELETE FROM table_auth WHERE auth_email = ? AND auth_key = ?";
        await queryPromise(connection, deleteAuthQuery, [email, key]);
  
        req.flash('color', 'success');
        req.flash('status', 'Yes..');
        req.flash('message', 'Registrasi berhasil');
  
        res.redirect('/login');
  
        connection.release();
      } else {
        res.redirect('/login');
        res.end();
      }
    } catch (error) {
      throw error;
    }
  }  
};

function queryPromise(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
