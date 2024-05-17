const express = require('express');
const { test, findAllBenefit, findAllPayrate, findTotalIncome, findTotalVacation
    , findTotalBenefit, findAll, addNewPersonal, findByPK, updatePersonal, deletePersonal } = require('../controllers/homeController');
const router = express.Router();

router.get('/', test);

router.get('/idbenefit', findAllBenefit);

router.get('/idpayrates', findAllPayrate);

router.get('/total', findTotalIncome);

router.get('/vacation', findTotalVacation);

router.get('/benefit', findTotalBenefit);

router.get('/list', findAll);

router.get('/:id', findByPK);

router.post('/create', addNewPersonal);

router.put('/update/:id', updatePersonal);

router.delete('/delete/:id', deletePersonal);



module.exports = router;