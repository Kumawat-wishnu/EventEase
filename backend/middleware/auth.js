const db=require('../db/connection');
const bcrypt=require("bcryptjs");
const crypto= require('crypto');
const jwt= require('jsonwebtoken');
const validator= require('validator');
const {promisify}= require('util');
const ErrorHandler= require('../utils/errorhandler');
const authModel= require('../models/authModel');
const sendEmail = require('../utils/sendEmail');

const isValidEmail = (email) => {
    return validator.isEmail(email);
  };

  const register = (req, res,next) => {
    console.log(req.body);

    const { name, email, password, confirm_password } = req.body;
     if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    db.query(
        "select email from users where email=?",
        [email],
        async (error, result) => {
            if (error) {
                console.log(error);
                return next(new ErrorHandler("Internal Server Error in finding email", 500));
            }

            if (result.length > 0) {
                return next(new ErrorHandler("Email id already Taken", 400));
            } else if (password !== confirm_password) {
                return next(new ErrorHandler("Password do not match", 400));
            }

            try {
                let hashedPassword = await bcrypt.hash(password, 8);

                db.query(
                    "insert into users set ?",
                    { username: name, email: email, password_hash: hashedPassword },
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return next(new ErrorHandler("Internal Server Error(registering)", 500));
                        } else {
                            return res.status(200).json({ msg: "User Registration Success", msg_type: "good" });
                        }
                    }
                );
            } catch (hashError) {
                console.log(hashError);
                return next(new ErrorHandler("Internal server Error(hasherror", 500));
            }
        }
    );
};

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
           if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      if (!email || !password) {
        return next(new ErrorHandler("Please Enter Your Email and Password", 400));
      }
  
      const result = await authModel.getUserByEmail(next,email);
  
      // console.log(`dekh result ${result}`);
  
      if (!result || !result.password_hash) {
        return next(new ErrorHandler("Invalid Email or Password()", 401));
      } 
    //   else if (result.active === 0) {
    //     return next(new ErrorHandler("you can't login", 401));
    //   } 
      else {
        const hashedPassword = result.password_hash;
  
        if (!(await bcrypt.compare(password, hashedPassword))) {
          return next(new ErrorHandler("Invalid Email or Password()", 401));
        } else {
          const id = result.user_id;
          const role = result.role;
          const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
  
          console.log("The Token is " + token);
          // localStorage.setItem('token',token);
  
          const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'None',
            domain: 'localhost',
            path: '/',
          };
         
          // res.status(201).cookie("token", token, options).json({
          //   success: true,
          //   user,
          //   token,
          // });
  
          // res.cookie("joes", token, cookieOptions);
          console.log("i am done");
          // console.log( res.cookie("token", token, cookieOptions))
          res.status(200).cookie("token", token, cookieOptions,{ domain: '127.0.0.1', path: '/' }).json({ msg: "Login Successful", msg_type: "good",token:token ,id:id , role:role});
        }
      }
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("Internal Server Error(login)", 500));
    }
  };

  const forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      // Check if the user with the provided email exists
      const user = await authModel.getUserByEmail(next, email);
  
      if (!user) {
        return next(new ErrorHandler('No user with this email address', 404));
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      console.log(`resetToken${resetToken}`);
  
      // Hash the token and save it to the database
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      console.log(`hashedToken ${hashedToken}`);
      
      // Update the user record in the database with the new reset token and expiry
      const updateResult = await authModel.updateUserResetToken(next,user.user_id, hashedToken, new Date(Date.now() + 10 * 60 * 1000));
  
      if (!updateResult) {
        return next(new ErrorHandler('Error updating reset token', 500));
      }
  
      // Construct the reset URL
      const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
  
      // Create the email message
      const message = `You are receiving this email because you (or someone else) has requested the reset of the password. Please click on the following link to set a new password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
  
      // Send the email
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Token',
        message,
      });
  
      res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error(error);
      next(new ErrorHandler('Error sending password reset email', 500));
    }
  };

  const resetPassword = async (req, res, next) => {
    try {
      // Hash the token from the URL
      const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
      console.log(`updated resetToken${resetToken}`);
  
      // Find the user with the hashed token and a valid expiration date
      const user = await authModel.getUserByResetToken(next,resetToken);
      console.log(user);
  
      if (!user || user.resetPasswordExpire <= Date.now()) {
        return next(new ErrorHandler('Invalid or expired token', 400));
      }
  
      // Set the new password and clear the reset token fields
      const newPassword = req.body.newPassword;
      const hashedPassword = await bcrypt.hash(newPassword, 8);
  
      const updateResult = await authModel.updatePasswordAndClearResetToken(
        next,
        user.user_id,
        hashedPassword,
        null,
        null
      );
  
      if (!updateResult) {
        return next(new ErrorHandler('Error resetting password', 500));
      }
  
      res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      next(new ErrorHandler('Error resetting password', 500));
    }
  };

  const logout = async (req, res) => {
    res.cookie("token", "logout", {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true,
    });
    res.status(200).json({success: true, message: 'Logout successful'})
    //.redirect("/");
    console.log("logged out successfully");
  };

   const isLoggedIn = async (req, res, next) => {
    try {
      console.log('All Cookies:', req.cookies);
      const {token} = req.cookies ;  //&& req.cookies.joes
      // const token=localStorage.getItem(token);
      console.log(req.cookies);
      console.log('token',token);
  
      if (!token) {
        return res.status(401).json({ message: "To use this resource, please login." });
      }
  
      const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
     // const userId = decode.id;
      const { id: id, role:role } = decode;
  
      console.log(`user rrole ${role}`);
  
      db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) {
          console.log(err);
          return next(); // Error occurred, proceed to the next middleware
        }
  
        const user = results[0];
  
        if (!user) {
          return res.status(401).json({ message: "To use this resource, please login." });
        }
  
       // req.user = user;
        req.user = { ...user, role };
        return next();
      });
    } catch (error) {
      console.log(error);
      return next();
    }
  };
  
  
  const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      console.log(`dekh roles ${req.user.role}`)
      console.log(`Required Roles: ${roles}`);
      if (!roles.includes(req.user.role)) {
        const errorMessage = `Role: ${req.user.role} is not allowed to access this resource`;
        // console.error(`Error: ${errorMessage}, Status Code: 403`);
        // res.status(400).json({status: false ,message:errorMessage})
        return next(
           new ErrorHandler(errorMessage,403)
        );
      }
      next();
    };
  };

module.exports= {
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    isLoggedIn,
    authorizeRoles
}