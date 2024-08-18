import { validationResult } from "express-validator";
import UserModel from "../Model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import tokenModel from "../Model/token.js";

dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            if (password.length < 8) {
                console.log('Password has minimum 8 characters.')
                return res.status(422).json({ message: "Password has minimum 8 characters." });
            }
            return res.status(401).json({ error: "Bad request", errorMessage: errors.array() });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create the user with hashed password
        try {
            let result = await UserModel.create({ username, email, password: hashedPassword });
            return res.status(200).json({ message: "User successfully registered.", result });
        } catch (error) {
            console.log(error);
            if (error.keyPattern.username) {
                console.log("Username already exists.");
                return res.status(400).json({ message: "Username already exists." });
            }
            if (error.keyPattern.email) {
                console.log("Email already exists.");
                return res.status(400).json({ message: "Email already exists." });
            }
            console.log(error);
            throw error; // Re-throw if not a duplicate key error
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            if (password.length < 8) {
                console.log('Invalid credentials.')
                return res.status(422).json({ message: "Invalid credentials." });
            }
            return res.status(401).json({ error: "Bad request", errorMessage: errors.array() });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ message: "This email is not registered." });
        }

        try{
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
        
            if(isMatch){
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn : '15m'});
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

                const newToken = new tokenModel({token : refreshToken});
                await newToken.save();
                // Check if the password is correct
                return res.status(200).json({accessToken : accessToken, refreshToken : refreshToken, user_id : user._id, username : user.username, email : user.email, message: "User successfully logged in."});
            }
            else {
                return res.status(401).json({ message: "Invalid credentials." });
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Internal server error." });
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};
