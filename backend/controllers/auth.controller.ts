import express from "express";
import User from "../models/user.models";
import Cookies from "cookies";
import {generateTokens,getCookie} from "../utils/auth.utils"
import {
	StatusCodes,
} from 'http-status-codes';
import jwt from "jsonwebtoken"


const handleRegister = async (req:express.Request,res:express.Response) => {
    //TODO needs hashing of the password
    const {firstName,surname,lastName,telephone,email,password} = req.body

    if(firstName == undefined || surname == undefined || lastName == undefined || 
    telephone == undefined || email == undefined || password == undefined)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Грешка"})
        return;
    }
    const phoneRegex = / ^\d{10}$ /;

    if (!phoneRegex.test(telephone)) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Невалиден телефон"})
        return;
    } 
    
    const emailRegex = / ^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Невалиден имейл"})
        return;
    }

    const passwordRegex = / ^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,32}$ /
    
    if(!passwordRegex.test(password)){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидна парола"})
        return;
    }

    const nameRegex = /[а-яА-я]{2,20}/

    if((await User.findOne({email: req.body.email})) !== null) {
       res.status(StatusCodes.CONFLICT).json({message: "Този имейл вече се използва"});
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
    const tokens = generateTokens(email,user._id.toString())
    cookies.set("access",tokens[0])
    cookies.set("refresh",tokens[1])
    res.status(StatusCodes.OK).send("Потребителят е регистриран успешно");
};

const handleLogIn = async (req:express.Request,res:express.Response)=>{
    const {email,password} = req.body
    //TODO needs hashing of the password    
    const user = await User.findOne({email})  
    if(user != null && user.password == password){
        const cookies = new Cookies(req,res,{secure:true})
        const tokens = generateTokens(email,user._id.toString())
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