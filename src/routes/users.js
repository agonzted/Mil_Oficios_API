const { Router } = require('express');
const router = Router();

const usersCtrl = require('../controllers/usersController')
const authjwt = require('../middlewares/authjwt')

router.post('/',usersCtrl.createUser);

router.get('/', usersCtrl.getUsers);

router.get('/:userId', usersCtrl.getUser);

router.put('/:userId', usersCtrl.updateUser);

router.delete('/:userId',[authjwt.verifyToken,authjwt.isAdmin], usersCtrl.deleteUser);

module.exports = router;