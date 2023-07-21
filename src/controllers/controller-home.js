const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    home(req,res){
        let id = req.session.userid
        let semester_year = req.session.semesterYear

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT 
                dosen_id, 
                dosen_name, 
                matkul_name,
                matkul_id,
                kelas_name,
                CASE WHEN table_answer.answer_semester = '${semester_year}'
                    THEN COUNT(answer_id)
                    ELSE 0
                END AS answer_count 
            FROM 
                table_user 
                INNER JOIN table_kbm ON table_kbm.kbm_kelas = table_user.user_kelas 
                INNER JOIN table_dosen ON table_dosen.dosen_id = table_kbm.kbm_dosen 
                INNER JOIN table_matkul ON table_matkul.matkul_id = table_kbm.kbm_matkul
                LEFT JOIN table_answer ON table_answer.answer_dosen = table_dosen.dosen_id
                    AND table_answer.answer_user = table_user.user_id 
                INNER JOIN table_kelas ON table_user.user_kelas = table_kelas.kelas_id
            WHERE 
                table_user.user_id = '${id}' AND
                table_kbm.kbm_semester = '${semester_year}'
            GROUP BY 
                dosen_id, 
                dosen_name,
                matkul_name,
                matkul_id,
                kelas_name;
            
            
                `
            , function (error, results) {
                if(error) throw error;
                res.render("home",{
                    url: 'https://beautiful-pink-scarab.cyclic.app/',
                    userName: req.session.username,
                    userid : req.session.userid,
                    semesterYear : req.session.semesterYear,
                    semesterGage : req.session.semesterGage,
                    dosen_name: results, // Change the key to dosen_names and assign the entire results object
                    dosen_id: results, // Change the key to dosen_names and assign the entire results object
                    answer_count : results,
                    matkul_name : results,
                    kelas_name : results,
                    matkul_id : results
                });
            });
            connection.release();
        })
    }
}
