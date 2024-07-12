const express = require('express');
const router = express.Router();
const Razorpay= require('razorpay');
const ErrorHandler= require('../utils/errorhandler');
const eventController=require('./eventController');
const crypto= require('crypto');

const razorpay= new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});

const createOrder=async(req,res,next)=>{
    // const { userId, eventId } = req.body;
    const userId=1;
    const eventId=1;

    try {
        // Create an order with Razorpay
        const options = {
            amount: 50000, // Amount in paise (e.g., 50000 paise = 500 INR)
            currency: 'INR',
            receipt: `receipt_order_${userId}_${eventId}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            userId,
            eventId,
        });

        //-------------------------------------------->
        // amountInPaise=req.body.amount;
        // const currency='INR';

        // //create Rezorpay order
        // const order=await razorpay.orders.create({
        //     amount:amountInPaise,
        //     currency,
        // });

        // //return the orderId and other details to the client
        // res.json({
        //     orderId:order.id,
        //     amount:order.amount,
        //     currency:order.currency,
        //     razorpayKey:process.env.RAZORPAY_KEY_ID,
        // })

        //--------------------------------------->
      
        
    }
        catch(error)
        {
            console.error('Error creating Razorpay order:', error);
            return next(new ErrorHandler('Error creating payment order', 500));

        }
    
};

// router.post('/verify-payment', async (req, res, next) => {
    const verifyPayment=async(req,res,next)=>{    
    const { userId, eventId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    try {
        // Verify payment signature
        const generatedSignature = crypto.createHmac('sha256', razorpay.key_secret)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');

        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // Call the registerForEvent controller
        return await eventController.registerForEvent(req, res, next);
    } catch (error) {
        console.error('Error verifying payment:', error);
        return next(new ErrorHandler('Error verifying payment', 500));
    }
};

module.exports={
    createOrder,
    verifyPayment
}
