import express from "express";
import User from "../models/user.models";
import Cookies from "cookies";
import {generateTokens,getCookie} from "../utils/auth.utils"
import {
	StatusCodes,
} from 'http-status-codes';
import jwt from "jsonwebtoken"
import Corporation from "../models/corporation.model";


const handleRegister = async (req:express.Request,res:express.Response) => {
    const {data} = req.body
    const {firstName,surname,lastName,telephone,email,password} = data

    /*
    temporary
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
       */
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
    const tokens = generateTokens(email,user._id.toString(),null,"user")
    cookies.set("access",tokens[0])
    cookies.set("refresh",tokens[1])
    res.status(StatusCodes.OK).send("Потребителят е регистриран успешно");
};

const handleLogIn = async (req:express.Request,res:express.Response)=>{
    const {data} = req.body
    const {email,password} = data

    const user = await User.findOne({email})
    const corp = await Corporation.findById({_id:user.organization})  
    if(user != null && user.password == password){
        const secureCookies = new Cookies(req,res,{secure:true})
        const cookies = new Cookies(req,res,{secure:false})
        const tokens = generateTokens(email,user._id.toString(),user.organization,user.role)
        secureCookies.set("access",tokens[0])
        secureCookies.set("refresh",tokens[1])
        cookies.set("corp",corp.name,{
            httpOnly: false, 
            secure: false,   
            
        })
        res.status(StatusCodes.OK).json({message:"Successfully logged in"})
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({message:"No user found"})
    }
}

const isAdmin = async (req:express.Request,res:express.Response)=>{
    const token = getCookie("access",req,res)
    let payload = jwt.decode(token)
    console.log(payload)
    
    let response = await User.findById({_id:payload.id})
    if(response && response.role == "admin"){
        res.status(StatusCodes.OK).json({isAdmin:true})
    }
    else{
        res.status(StatusCodes.FORBIDDEN).json({isAdmin:false})
    }   
}

const logOut = async (req:express.Request,res:express.Response)=>{
    res.clearCookie('refresh');
    res.clearCookie('access');
    res.clearCookie("corp");
    res.status(200).send('Logout successful');
}

export default {handleRegister, handleLogIn,isAdmin,logOut}