const { Router } = require('express');
const router = Router();

const authCtrl = require('../controllers/authController')

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);

module.exports = router;