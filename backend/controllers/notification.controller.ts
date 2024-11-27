import express from "express";
import Document from "../models/document.model"

const getNotifications = async(req:express.Request,res:express.Response) =>{
  //getting notifications that are due within 1 month
    let todaysDate = new Date()
    let oneMonthLater = new Date(todaysDate.getFullYear(),todaysDate.getMonth()+1,todaysDate.getDate(),0)
    const pipeLine = [{
      $match:{
        "date":{
          $lte: oneMonthLater 
        }
      }
    }]
    const response = await Document.aggregate(pipeLine);
    res.status(200).send(response);
}

export default {getNotifications}
  