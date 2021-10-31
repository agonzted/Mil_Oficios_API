const { Router } = require('express');
const router = Router();

const authjwt = require('../middlewares/authjwt')
const workCtrl = require('../controllers/workController')

router.post('/',[authjwt.verifyToken,authjwt.isAdmin],workCtrl.createWork);

router.get('/', workCtrl.getWorks);

router.get('/:workId', workCtrl.getWork);

router.put('/:workId', [authjwt.verifyToken,authjwt.isAdmin],workCtrl.updateWork);

router.delete('/:workId',[authjwt.verifyToken,authjwt.isAdmin], usersCtrl.deleteUser);

module.exports = router;