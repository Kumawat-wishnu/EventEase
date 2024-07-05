const Razorpay= require('razorpay');

const razorpay= new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});

const createOrder=async(req,res)=>{
    try{
        amountInPaise=req.body.amount;
        const currency='INR';

        //create Rezorpay order
        const order=await razorpay.orders.create({
            amount:amountInPaise,
            currency,
        });

        //return the orderId and other details to the client
        res.json({
            orderId:order.id,
            amount:order.amount,
            currency:order.currency,
            razorpayKey:process.env.RAZORPAY_KEY_ID,
        })
    }
        catch(error)
        {
            console.log(error);
            res.status(500).json({error:'Internal server error'});

        }
    
};

module.exports={
    createOrder
}
