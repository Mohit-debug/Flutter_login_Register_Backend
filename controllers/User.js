import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";

 dotenv.config();

 export const UserRegister = async (req, res, next) => {
    try {
      const { name, email, password, phone_number } = req.body;
  
      const existingUser = await User.findOne({ phone_number }).exec();
      if (existingUser) {
        return next(createError(409, "Phone Number is already in exist."));
      }
  
      const user = new User({
        name,
        email,
        phone_number,
        password,
      });

      await user.save();
      console.log(req.body); 
      
      return res.status(200).json({ user });
    } catch (error) {
      return next(error);
    }
  };
  
 export const UserLogin = async (req, res, next) => {
   
    try {
      const {email,password}=req.body
      console.log(req.body);      
  
      const user = await User.findOne({ email });
      if (!user) {
        return next(createError(404, "User not found"));
      }
     
      if (password !== user.password) {
        return next(createError(403, "Incorrect password"));
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "9999 years",
      });
  
      return res.status(200).json({ token, user });
    } catch (error) {
      return next(error);
    }
  };

  export const getUserDetails = async (req, res, next) => {
    try {
      console.log(req.params.email); 
      const { email } = req.params;
  
      const user = await User.findOne({ email: email }).select('+password').exec();
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error); 
      next(error);
    }
  };
  
  