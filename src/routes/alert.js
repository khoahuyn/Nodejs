const express = require('express');
const {findBirtDayAlert} = require('../controllers/alertController');
const router = express.Router();


router.get('/birtday', findBirtDayAlert);


module.exports = router;


