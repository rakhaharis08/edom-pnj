const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const penilaianController = require('../controllers').penilaian;
const dosenController = require('../controllers/controller-dosen');
const marksheetController = require('../controllers/controller-marksheet');
const adminController = require('../controllers/controller-admin');
const kaprodiController = require('../controllers/controller-kaprodi');
const kajurController = require('../controllers/controller-kajur');
const jurusanController = require('../controllers/controller-jurusan');
const prodiController = require('../controllers/controller-prodi');
const userController = require('../controllers/controller-user');
const kelasController = require('../controllers/controller-kelas');
const kbmController = require('../controllers/controller-kbm');
const semesterController = require('../controllers/controller-semester');
const verifyUser = require('../configs/verify');


//Mahasiswa
router.get('/', verifyUser.isLogin, verifyUser.isUser,  homeController.home);
router.get('/marksheet', verifyUser.isLogin, verifyUser.isUser, marksheetController.marksheet);
router.get('/link-marksheet', verifyUser.isLogin, verifyUser.isUser,marksheetController.linkmarksheet);
router.post('/marksheet/add-marksheet', verifyUser.isLogin, verifyUser.isUser, marksheetController.addmarksheet);
router.get('/penilaian', verifyUser.isLogin, verifyUser.isUser, penilaianController.penilaian);
router.post('/penilaian/savepenilaian', verifyUser.isLogin, verifyUser.isUser, penilaianController.savepenilaian); // Tambahkan rute POST savepenilaian

//Dosen
router.get('/dosen', verifyUser.isLogin, verifyUser.isDosen, dosenController.dosen);
router.get('/dosen_semester', verifyUser.isLogin, verifyUser.isDosen, dosenController.dosen_semester);


//KAPRODI
router.get('/kaprodi', verifyUser.isLogin, verifyUser.isKaprodi, kaprodiController.kaprodi);
router.get('/kaprodi_semester', verifyUser.isLogin, verifyUser.isKaprodi, kaprodiController.kaprodi_semester);

//KAJUR
router.get('/kajur', verifyUser.isLogin, verifyUser.isKajur, kajurController.kajur);
router.get('/kajur_semester', verifyUser.isLogin, verifyUser.isKajur, kajurController.kajur_semester);

//ADMIN
router.get('/admin', verifyUser.isLogin, verifyUser.isAdmin, adminController.admnin);
router.get('/kelas', verifyUser.isLogin, verifyUser.isAdmin, kelasController.kelas);
router.get('/add-kelas', verifyUser.isLogin, verifyUser.isAdmin, kelasController.addkelas);
router.post('/add-kelas/savekelas', verifyUser.isLogin, verifyUser.isAdmin, kelasController.savekelas);
router.get('/kbm', verifyUser.isLogin, verifyUser.isAdmin, kbmController.kbm);
router.get('/add-kbm', verifyUser.isLogin, verifyUser.isAdmin, kbmController.addkbm);
router.post('/add-kbm/savekbm', verifyUser.isLogin, verifyUser.isAdmin, kbmController.savekbm);
router.get('/jurusan', verifyUser.isLogin, verifyUser.isAdmin, jurusanController.jurusan);
router.get('/add-jurusan', verifyUser.isLogin, verifyUser.isAdmin, jurusanController.addJurusan);
router.post('/add-jurusan/savejurusan', verifyUser.isLogin, verifyUser.isAdmin, jurusanController.savejurusan);
router.get('/prodi', verifyUser.isLogin, verifyUser.isAdmin, prodiController.prodi);
router.get('/add-prodi', verifyUser.isLogin, verifyUser.isAdmin, prodiController.addprodi);
router.post('/add-prodi/saveprodi', verifyUser.isLogin,verifyUser.isAdmin, prodiController.saveprodi);
router.get('/semester', verifyUser.isLogin, verifyUser.isAdmin, semesterController.semester);
router.post('/change-semester-status', verifyUser.isLogin, verifyUser.isAdmin, semesterController.changesemester);
router.get('/add-semester', verifyUser.isLogin, verifyUser.isAdmin, semesterController.addsemester);
router.post('/add-semester/savesemester', verifyUser.isLogin, verifyUser.isAdmin, semesterController.savesemester);
router.get('/auth-register', verifyUser.isLogin, verifyUser.isAdmin, userController.user);
router.post('/auth-register/saveauth', verifyUser.isLogin, verifyUser.isAdmin, userController.adduser);
router.get('/profile', verifyUser.isLogin, profileController.profile);
module.exports = router;

