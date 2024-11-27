import { StatusCodes } from "http-status-codes";
import Transaction from "../models/transactions.model";
import Exam from "../models/exams.model"
import {parseQueryParams} from "../utils/query.utils"
import express from "express";
import User from "../models/user.models"

async function getUserProfileInfo(req:express.Request,res:express.Response){
  const params = parseQueryParams(req.originalUrl)
  const id = params.candidateId
  //sending data to be displayed in the profile of the user
  let user = await User.findById({_id:id})
  let {firstName,surname,lastName} = user;

  let transactions = await Transaction.find({candidate:id}).lean()

  res.send({
    firstName:firstName,
    surname:surname,
    lastName:lastName,
    transactions:transactions
  })

}
  
async function makeTransaction(req:express.Request,res:express.Response){
    const {sum,id} = req.body
  
    const transaction = new Transaction({
      date:new Date(),
      sum:sum,
      candidate:id,
    })
    transaction.save()
}
  
async function signNewExam(req:express.Request,res:express.Response){
    //TODO: направи така че да се въвежда датата а не да взема сегашния момент
  
    const {type,result,id} = req.body
    //defining exam
    let exam = new Exam({
      type:type,
      date:new Date(),
      result:result,
      candidate:id,
    })
  
    let searchResult = await Exam.find({candidate:id})
    let theoreticalPassed = false
    
    searchResult.map((exam)=>{
      if(exam.type == "theoretical" && exam.result == "yes"){
        theoreticalPassed = true;
      }
    })

    //checks if the defined exam is valid
    if(!theoreticalPassed && type == "theoretical"){
      exam.save()
    }
    else if(theoreticalPassed && type == "practical"){
      exam.save()
    }
    else{
      //TODO: оправи кодовете като дойде време и описанието 
      res.status(StatusCodes.CONFLICT).send("Невалиден изпит");
    }
}

async function getAllExams(req:express.Request,res:express.Response){
    const params = parseQueryParams(req.originalUrl)
    let candidateId = params.candidateId
    //TODO
    let examFormatted:object[] = []
    const response = await Exam.find({candidate:candidateId})

    //formatting the exam from the db to be shown on the frontend
    response.map((exam)=>{
      let examObject = {}
      if(exam.type == "theoretical"){
        examObject["type"] = "теоритичен"
      }
      else{
        examObject["type"] = "практичен"
      }
      if(exam.result == "yes"){
        examObject["result"] = "да"
      }
      else{
        examObject["result"] = "не"
      }
      examObject["date"] = exam.date
      examFormatted.push(examObject)
    })
    res.send(examFormatted)
}

async function deleteTransaction(req:express.Request,res:express.Response){
  const {id} = req.body
  await Transaction.deleteOne({_id:id});
}
export default {getAllExams,signNewExam,makeTransaction,getUserProfileInfo,deleteTransaction}