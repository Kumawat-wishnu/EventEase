const cloudinary= require('../cloudinary');
const multer=require('multer');
const userModel= require('../models/userModel');
const ErrorHandler= require('../utils/errorhandler');
const path = require('path');
const fs = require('fs');

const getAllUsers = async (req, res,next) => {
    try {
        // Call the model function to fetch all events from the database
        console.log("getAllUsers is triggered");
        const users = await userModel.getAllUsers(next);

        // Send the list of events as a response
        console.log(users);
        res.status(200).json({ success: true, users});
    } catch (error) {
        console.error('Error getting all users:', error);
        return next(new ErrorHandler('Error getting all users',500));
        
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        // Call the model function to delete the event from the database
        await userModel.deleteUser(userId,next);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return next(new ErrorHandler('Error deleting user', 500));
    }
};



module.exports={
    getAllUsers,
    deleteUser
}