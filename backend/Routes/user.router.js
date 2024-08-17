import express from 'express';
import { body } from "express-validator";
const userRouter = express.Router();

import { createUser } from '../Controller/user.controller.js';

userRouter.post('/signup',
body("fullname","fullname is required").notEmpty(),
body("email","email id is required").notEmpty(),
body("email","email id is incorrect").isEmail(),
body("password","password is required").notEmpty(),
body("password","password must have at least 8 letter").isLength({min:8}),createUser);

export default userRouter ; 