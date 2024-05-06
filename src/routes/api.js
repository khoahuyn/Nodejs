const express = require('express');
const { test, findAllEmplyee, findAllPersonal, findTotalIncome, findTotalVacation
    , findTotalBenefit, findAll, addNewPersonal, findByPK, updatePersonal, deletePersonal } = require('../controllers/homeController');
const router = express.Router();

router.get('/', test);

router.get('/employee', findAllEmplyee);

router.get('/personal', findAllPersonal);

router.get('/total', findTotalIncome);

router.get('/vacation', findTotalVacation);

router.get('/benefit', findTotalBenefit);

router.get('/list', findAll);

router.get('/:id', findByPK);

router.post('/create', addNewPersonal);

router.put('/update/:id', updatePersonal);

router.delete('/delete/:id', deletePersonal);



module.exports = router;