import Cookies from "cookies";
import express from "express";
import jwt from "jsonwebtoken";
import User, { userType } from "../models/user.models"
import { StatusCodes } from "http-status-codes";
import { getCookie } from "../utils/auth.utils";


interface signInReq extends express.Request {
    user: userType;
  }
  
const verifyUserRole = async (req:express.Request,res:express.Response,next:express.NextFunction) => {

    const cookies = new Cookies(req,res)
    let token  = cookies.get("access") as string
    let { payload } = jwt.decode(token);
    let user = await User.findOne({email:payload});
    
    if(user?.role != "admin"){
        res.status(StatusCodes.FORBIDDEN)
    } 
    
    next()
}

const verifyUserCookie = async(req:express.Request,res:express.Response,next:express.NextFunction) => {
    
    let access = getCookie("access",req,res)
    console.log(access)
    jwt.verify(access,process.env.JWT_ACCESS_SECRET_KEY,(error)=>{
        if(error){
            
            res.status(StatusCodes.CONFLICT).json({message:"Невалиден тоукън"})
            return;
        }
        else{
            next()
        }
    })
}

export default {verifyUserRole,verifyUserCookie}