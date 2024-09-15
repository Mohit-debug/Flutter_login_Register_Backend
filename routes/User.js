import express from "express";
import {
  UserLogin,
  UserRegister,
  getUserDetails
} from "../controllers/User.js";

const router = express.Router();


//general api...
router.post("/login",UserLogin);
router.post("/signup", UserRegister);
router.get('/userdata/:email', getUserDetails);


export default router;
