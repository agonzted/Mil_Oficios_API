const { Router } = require('express');
const router = Router();

const authCtrl = require('../controllers/authController')

router.post('/login', authCtrl.login);

module.exports = router;