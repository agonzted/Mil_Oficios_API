const { Router } = require('express');
const router = Router();

const usersCtrl = require('../controllers/usersController')

router.post('/',usersCtrl.createUser);

router.get('/', usersCtrl.getUsers);

router.get('/:userId', usersCtrl.getUser);

router.put('/:userId', usersCtrl.updateUser);

router.delete('/:userId', usersCtrl.deleteUser);

module.exports = router;