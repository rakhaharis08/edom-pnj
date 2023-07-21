const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    admnin(req,res){
        let id = req.session.userid
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user where user_id = '${id}';
                `
            , function (error, results) {
                if(error) throw error;
                res.render("admin",{
                    url: 'https://beautiful-pink-scarab.cyclic.app',
                    userName: req.session.username,
                    nama: results[0]['user_name'],
                    email: results[0]['user_email']
                });
            });
            connection.release();
        })
    }
}