const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const penilaianController = require('../controllers').penilaian;
const dosenController = require('../controllers/controller-dosen');
const adminController = require('../controllers/controller-admin');
const kaprodiController = require('../controllers/controller-kaprodi');
const kajurController = require('../controllers/controller-kajur');
const jurusanController = require('../controllers/controller-jurusan');
const prodiController = require('../controllers/controller-prodi');
const userController = require('../controllers/controller-user');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/dosen', verifyUser.isLogin, dosenController.dosen);
router.get('/dosen_semester', verifyUser.isLogin, dosenController.dosen_semester);
router.get('/admin', verifyUser.isLogin, adminController.admnin);
router.get('/kaprodi', verifyUser.isLogin, kaprodiController.kaprodi);
router.get('/kaprodi_semester', verifyUser.isLogin, kaprodiController.kaprodi_semester);
router.get('/jurusan', verifyUser.isLogin, jurusanController.jurusan);
router.post('/add-jurusan/savejurusan', verifyUser.isLogin, jurusanController.savejurusan);
router.get('/add-jurusan', verifyUser.isLogin, jurusanController.addJurusan);
router.get('/prodi', verifyUser.isLogin, prodiController.prodi);
router.get('/auth-register', verifyUser.isLogin, userController.user);
router.post('/auth-register/saveauth', verifyUser.isLogin, userController.adduser);
router.post('/add-prodi/saveprodi', verifyUser.isLogin,prodiController.saveprodi);
router.get('/add-prodi', verifyUser.isLogin, prodiController.addprodi);
router.get('/kajur', verifyUser.isLogin, kajurController.kajur);
router.get('/kajur_semester', verifyUser.isLogin, kajurController.kajur_semester);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/penilaian', verifyUser.isLogin, penilaianController.penilaian);
router.post('/penilaian/savepenilaian', verifyUser.isLogin, penilaianController.savepenilaian); // Tambahkan rute POST savepenilaian

module.exports = router;
