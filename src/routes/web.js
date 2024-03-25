const express=require('express');
const {getHomepage,getForm} =require('../controllers/homeController');
const router=express.Router();

router.get('/', getHomepage) ;

router.get('/Linh', getForm);

module.exports=router;