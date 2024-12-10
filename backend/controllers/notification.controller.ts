import express from "express";
import Document from "../models/document.model"
import { StatusCodes } from "http-status-codes";

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
    res.status(StatusCodes.OK).send(response);
}

export default {getNotifications}
  