import Corporation from "../models/corporation.model";
import express from "express";

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
}

export default {createCorporation}