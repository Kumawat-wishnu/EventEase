const db=require('../db/connection');
const express = require('express');
const paymentController=require('../Controllers/paymentController');

const router= express.Router();
// router.use(isLoggedIn );

router.post('/createOrder',paymentController.createOrder);
router.post('/verifyPayment',paymentController.verifyPayment);

module.exports=router;