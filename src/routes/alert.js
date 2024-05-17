const express = require('express');
const { findBirtDayAlert, findAniversary, findVacationDay } = require('../controllers/alertController');
const router = express.Router();


router.get('/birtday', findBirtDayAlert);

router.get('/aniversary', findAniversary);

router.get('/vacation', findVacationDay);


module.exports = router;


