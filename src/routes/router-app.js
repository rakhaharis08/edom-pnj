const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const penilaianController = require('../controllers').penilaian;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/penilaian', verifyUser.isLogin, penilaianController.penilaian);
router.post('/savepenilaian', verifyUser.isLogin, penilaianController.savepenilaian);
module.exports = router;