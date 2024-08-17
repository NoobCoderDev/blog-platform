import { validationResult } from "express-validator"; 
import UserModel from "../Model/user.model.js";

export const createUser = async (req, res) => {
    try{
        const errors =  validationResult(req);
        if(!errors.isEmpty())
        return res.status(401).json({error: "Bad request", errorMessage : errors.array()});

        const {fullname,email,password} = req.body;
        console.log(fullname,email,password);
        let result = await UserModel.create({fullname,email,password}); 
        return res.status(200).json({message : 'User successfully register.',result});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : 'Internal server error.'});
    }
}