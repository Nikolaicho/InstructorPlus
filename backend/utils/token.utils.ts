import jwt from "jsonwebtoken";
import { getCookie } from "./auth.utils";
import express from "express";

function decodeCookie(req:express.Request,res:express.Response,name:string){
    let accessToken = getCookie(name,req,res)
    return jwt.decode(accessToken)
}

function getCorporationFromCookie(req:express.Request,res:express.Response){
    return decodeCookie(req,res,"access").corporationId    
}

function getRoleFromCookie(req:express.Request,res:express.Response){
    return decodeCookie(req,res,"access").role   
}

function getIdFromCookie(req:express.Request,res:express.Response){
    return decodeCookie(req,res,"access").id
}

export { getCorporationFromCookie,getRoleFromCookie,getIdFromCookie}