const db=require('../db/connection');
const bcrypt = require("bcryptjs");
const ErrorHandler = require('../utils/errorhandler');


const getUserByEmail = async (next,email) => {
    try {
      const [rows, fields] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (rows && rows.length > 0) {
        return rows[0]; // Return the first user found (assuming emails are unique)
      } else {
        return null; // If no user found with the given email
      }
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler('Internal Server Error',500));
    }
  };

  const updateUserResetToken = async (next,userId, hashedToken, expiryDate) => {
    try {
      const query = `
        UPDATE users
        SET resetPasswordToken = ?,
            resetPasswordExpire = ?
        WHERE user_id = ?;
      `;
  
      const [result] = await db.promise().execute(query, [hashedToken, expiryDate, userId]);
  
      // Check if the update was successful
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal Server Error',500));
    }
  };

  const getUserByResetToken= async(next,resetToken)=>{
    try{
      console.log("it is coming");
      const [rows,fields]= await db.promise().query('SELECT * FROM users WHERE resetPasswordToken = ?', [resetToken]);
      if(rows && rows.length >0){
        console.log(`GUBRT ${rows[0]}`);
        return rows[0];
      }
      else 
      return null;
    }
    catch(error){
      console.log(error);
      return next(new ErrorHandler('Internal Server Error',500));
    }
  };

  const updatePasswordAndClearResetToken=async(next,user_id,hashedPassword,resetPasswordToken,resetPasswordExpiry)=>{
    try{
      const query=`
      UPDATE users
      SET password_hash = ?,
          resetPasswordToken = ?,
          resetPasswordExpire = ?
      WHERE user_id = ?;    
      `;
      
      const [result]= await db.promise().execute(query, [hashedPassword, resetPasswordToken,resetPasswordExpiry,user_id]);
      return result.affectedRows >0;
    }
    catch(error)
    {
      console.log(error);
      return next(new ErrorHandler('Internal Server Error',500));
    }
  }


  module.exports={
    getUserByEmail,
    updateUserResetToken,
    getUserByResetToken,
    updatePasswordAndClearResetToken
  };