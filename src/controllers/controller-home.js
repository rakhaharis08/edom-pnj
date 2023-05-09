const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    home(req,res){
        let id = req.session.userid
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT 
                dosen_id, 
                dosen_name, 
                COALESCE(COUNT(question_id), 0) AS question_count 
            FROM 
                table_user 
                INNER JOIN table_kbm ON table_kbm.kbm_kelas = table_user.user_kelas 
                INNER JOIN table_dosen ON table_dosen.dosen_id = table_kbm.kbm_dosen 
                LEFT JOIN table_question ON table_question.question_dosen = table_dosen.dosen_id 
                    AND table_question.question_user = table_user.user_id 
            WHERE 
                table_user.user_id = '${id}'
            GROUP BY 
                dosen_id, 
                dosen_name;
                `
            , function (error, results) {
                if(error) throw error;
                res.render("home",{
                    url: 'http://localhost:5050/',
                    userName: req.session.username,
                    userid : req.session.userid,
                    dosen_name: results, // Change the key to dosen_names and assign the entire results object
                    dosen_id: results, // Change the key to dosen_names and assign the entire results object
                    question_count : results
                });
            });
            connection.release();
        })
    }
}
