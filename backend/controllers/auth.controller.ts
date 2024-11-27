import express from "express";
import User from "../models/user.models";
import Cookies from "cookies";
import {generateTokens,getCookie} from "../utils/auth.utils"
import {
	StatusCodes,
} from 'http-status-codes';
import jwt from "jsonwebtoken"


const handleRegister = async (req:express.Request,res:express.Response) => {
    const {firstName,surname,lastName,telephone,email,password} = req.body

    if((await User.findOne({email: req.body.email})) !== null) {
       res.status(StatusCodes.CONFLICT).json({message: "This user already exists"});
       return;
    }
    
    const user = new User({
        firstName:firstName,
        surname:surname,
        lastName:lastName,
        telephone:telephone,
        email:email,
        password:password,
        role:"user"
    })

    user.save();

    const cookies = new Cookies(req,res,{secure:true})
    const tokens = generateTokens(req.body.email)
    cookies.set("access",tokens[0])
    cookies.set("refresh",tokens[1])
    res.status(StatusCodes.OK).send("User registered successfully");
};

const handleLogIn = async (req:express.Request,res:express.Response)=>{

    if(await User.findOne({email:req.body.email}) !== null){
        const cookies = new Cookies(req,res,{secure:true})
        const tokens = generateTokens(req.body.email)
        cookies.set("access",tokens[0])
        cookies.set("refresh",tokens[1])
        res.status(StatusCodes.OK).json({message:"Successfully logged in"})
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({message:"No user found"})
    }
}

const isAdmin = async (req:express.Request,res:express.Response)=>{
    const token = getCookie("token",req,res)
    let payload = jwt.decode(token)
    
    let response = await User.findOne({email:payload})
    if(response && response.role == "admin"){
        res.status(StatusCodes.OK).json({isAdmin:true})
    }
    else{
        res.status(StatusCodes.FORBIDDEN).json({isAdmin:false})
    }
    
}
export default {handleRegister, handleLogIn,isAdmin}