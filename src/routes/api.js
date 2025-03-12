const express = require('express');
const {test,findAllPayRates,findEmployee}=require('../controllers/homeController');
const router=express.Router();

router.get('/', test) ;

router.get('/payRates', findAllPayRates);

router.get('/employee',findEmployee)

module.exports=router;