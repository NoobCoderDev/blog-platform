import { validationResult } from "express-validator";
import UserModel from "../Model/user.model.js";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        console.log(fullname, email, password);

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
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
            let result = await UserModel.create({ fullname, email, password: hashedPassword });
            return res.status(200).json({ message: "User successfully registered.", result });
        } catch (error) {
            if (error.code === 11000) {
                // MongoDB duplicate key error code
                console.log(error);
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(401).json({ error: "Bad request", errorMessage: errors.array() });
        }
        const { email, password } = req.body;
        console.log(email, password);

        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ message: "This email is not registered." });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(200).json({ message: "User successfully logged in.", user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};
