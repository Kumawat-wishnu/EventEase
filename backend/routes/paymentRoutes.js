const db=require('../db/connection');
const express = require('express');
const paymentController=require('../Controllers/paymentController');

const router= express.Router();
// router.use(isLoggedIn );

router.post('/create-order',paymentController.createOrder);

module.exports=router;