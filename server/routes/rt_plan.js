const express = require('express');

const planController = require('../controller/cont_plan');

const router = express.Router()

router.post('/newPlan', planController.newPlan);

//router.post('/editItem');

router.get('/planlist', planController.getPlanList);

module.exports = router;