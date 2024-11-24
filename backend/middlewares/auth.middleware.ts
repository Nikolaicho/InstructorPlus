import Cookies from "cookies";
import express from "express";
import jwt from "jsonwebtoken";
import User, { userType } from "../models/user.models"


interface signInReq extends express.Request {
    user: userType;
  }
  
const verifyUserRole = async (req:express.Request,res:express.Response,next:express.NextFunction) => {

    const cookies = new Cookies(req,res)
    let token  = cookies.get("access") as string
    let { payload } = jwt.decode(token);
    let user = await User.findOne({email:payload});
    
    if(user?.role != "admin"){
        res.status(403)
    } 

    (req as signInReq).user = user;
    next()
}


export default {verifyUserRole}