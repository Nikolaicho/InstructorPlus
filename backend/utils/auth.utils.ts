import Cookies from "cookies";
import jwt from "jsonwebtoken";
import express from "express"

function generateTokens(name:string,id:string):Array<string>{
    const accessSecretKey = process.env.JWT_ACCESS_SECRET_KEY
    const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
    const accessToken = jwt.sign({name:name,id:id},accessSecretKey,{expiresIn:"2h"}) as string
    const refreshToken = jwt.sign({name:name,id:id},refreshSecretKey) as string
    return [accessToken,refreshToken]
}

function getCookie(cookieName:string,req:express.Request,res:express.Response):string{
    const cookies = new Cookies(req,res)
    let cookie  = cookies.get(cookieName) as string
    return cookie;
}


export { generateTokens,getCookie};