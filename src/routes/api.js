const express = require('express');
const {test,findAllPayRates,findAllPersonal}=require('../controllers/homeController');
const router=express.Router();

router.get('/', test) ;

router.get('/payRates', findAllPayRates);

router.get('/personal', findAllPersonal);

module.exports=router;