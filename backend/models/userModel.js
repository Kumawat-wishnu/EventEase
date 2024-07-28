const db= require('../db/connection');
const ErrorHandler = require("../utils/errorhandler");

const getAllUsers = async (next) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.error('Error getting all users from database:', error);
        return next(new ErrorHandler('Error getting all users from database:',500));
    }
};

const deleteUser= async(userId,next)=>{
    try{
        await db.promise().execute('DELETE FROM users WHERE user_id=?', [userId]);
    }
    catch(error)
    {
        console.log('Error deleting User:',error);
        return next(new ErrorHandler('Error deleting User:',500));
    }
}

const updateUserRole= async(userId,newRole)=>{
    await db.execute('UPDATE users SET role = ? WHERE user_id = ?', [newRole,userId]);
    return {status:true, message:"userRole updated successfully"};

};

module.exports={
    getAllUsers,
    deleteUser,
    updateUserRole
}