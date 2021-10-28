const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController')

router.post('/',controller.post);
router.get('/',controller.get);
router.put('/',controller.put)
router.delete('/',controller.delete);

module.exports = router;