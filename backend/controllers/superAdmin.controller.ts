import Corporation from "../models/corporation.model";
import express from "express";
import User from "../models/user.models";

async function createCorporation(req:express.Request,res:express.Response) {
  //creating new corporation
    const {identityNumber,responsiblePerson,adress,telephone,name} = req.body
    let corporation = new Corporation({
      _id:identityNumber,
      responsiblePerson:responsiblePerson,
      adress:adress,
      telephone:telephone,
      name:name,
    })
    corporation.save()
}
async function createInstructor(req:express.Request,res:express.Response){
  const {id} = req.body
  let userToBePromoted = await User.findById({_id:id})
  console.log(userToBePromoted);
  userToBePromoted.role = "admin"
  userToBePromoted.save();
}
export default {createCorporation,createInstructor}