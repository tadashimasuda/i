var express = require('express');
var router = express.Router();
const productsControllers = require('../controllers/productsController');

router.get('/',productsControllers.index);

router.get('/:id',productsControllers.show);


module.exports = router;