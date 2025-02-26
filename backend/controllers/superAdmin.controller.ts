import Corporation from "../models/corporation.model";
import express from "express";
import { getIdFromCookie } from "../utils/token.utils";
import User from "../models/user.models";

async function createCorporation(req:express.Request,res:express.Response) {
  //creating new corporation
  
  const {data} = req.body
  const {identityNumber,adress,telephone,name} = data
  let corporation = new Corporation({
    _id:identityNumber,
    adress:adress,
    telephone:telephone,
    name:name,
  })
  corporation.save()
    
  let userId = getIdFromCookie(req,res)
  let user = await User.findById({_id:userId})
  user.role = "superAdmin"
  user.organization = corporation._id
  user.save()
}

export default {createCorporation}