const db=require('../db/connection');
const express=require('express');
const auth=require('../middleware/auth');

const router= express.Router();

router.post('/register',auth.register);
router.post('/login',auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.put('/reset-password/:token', auth.resetPassword);
// Route for user log out
router.get("/logout", auth.logout);
router.get('/check-login', auth.isLoggedIn, (req, res) => {
    console.log(req.user);
    res.status(200).json({ status:200,isLoggedIn: true, user: req.user });
});

module.exports=router;