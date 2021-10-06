const express = require('express');

const itemController = require('../controller/cont_item');

const router = express.Router()

router.post('/newItem', itemController.newItem);

//router.post('/editItem');

//router.get('/item');

module.exports = router;