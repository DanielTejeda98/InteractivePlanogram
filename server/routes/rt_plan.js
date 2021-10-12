const express = require('express');

const planController = require('../controller/cont_plan');

const router = express.Router()

router.post('/newPlan', planController.newPlan);

//router.post('/editItem');
router.get('/getPlan/:id', planController.getPlan);

router.get('/planlist', planController.getPlanList);

router.delete('/deletePlan/:id', planController.deletePlan);


module.exports = router;