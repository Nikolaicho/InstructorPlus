import jwt from "jsonwebtoken";
import { getCookie } from "./auth.utils";
import express from "express";

function getCorporationFromCookie(req:express.Request,res:express.Response){
    let accessToken = getCookie("access",req,res)
    let tokenInfo = jwt.decode(accessToken)
    return tokenInfo.corporationId    
}
export default { getCorporationFromCookie }