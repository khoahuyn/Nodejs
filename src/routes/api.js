const express = require('express');
const { test, findAllEmplyee, findAllPersonal, findTotalIncome, findTotalVacation, findTotalBenefit,findAll } = require('../controllers/homeController');
const router = express.Router();

router.get('/', test);

router.get('/employee', findAllEmplyee);

router.get('/personal', findAllPersonal);

router.get('/total', findTotalIncome);

router.get('/vacation', findTotalVacation);

router.get('/benefit', findTotalBenefit);

router.get('/list', findAll);




module.exports = router;