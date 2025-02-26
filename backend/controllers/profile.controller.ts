import { StatusCodes } from "http-status-codes";
import Transaction from "../models/transactions.model";
import Exam from "../models/exams.model"
import {parseQueryParams} from "../utils/query.utils"
import express from "express";
import User from "../models/user.models"
import { format } from "date-fns";
import { getIdFromCookie } from "../utils/token.utils";


async function getUserProfileInfo(req:express.Request,res:express.Response){
  const params = parseQueryParams(req.originalUrl)

  if(params == undefined){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни параметри"})
    return;
  }

  const id = params.candidateId
  //sending data to be displayed in the profile of the user
  let user = await User.findById({_id:id})
  
  let {firstName,surname,lastName,telephone,email,_id} = user;

  if(firstName == undefined || surname == undefined || lastName == undefined){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидно id"})
    return 
  }

  res.send({
    id:_id,
    firstName:firstName,
    surname:surname,
    lastName:lastName,
    telephone:telephone,
    email:email,
  })

}

  
async function makeTransaction(req:express.Request,res:express.Response){

    const {data,id} = req.body
    if(data.sum == undefined || id == undefined){
      res.status(StatusCodes.BAD_REQUEST).json("Невалидни данни за транзакция")
    } 
    const transaction = new Transaction({
      date:new Date(),
      sum:data.sum,
      candidate:id,
    })
    transaction.save()
}
  
async function signNewExam(req:express.Request,res:express.Response){
  
    const {type,result,id,date} = req.body
    if(!(type == "theoretical" || type == "practical") || !(result == "yes" || result == "no")){
      res.status(StatusCodes.BAD_REQUEST).json("Невалидни данни за транзакция")
      return;
    }
    
    //defining exam
    let exam = new Exam({
      type:type,
      date:date,
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
        examObject["type"] = "Теоретичен"
      }
      else{
        examObject["type"] = "Практичен"
      }
      if(exam.result == "yes"){
        examObject["result"] = "ДА"
      }
      else{
        examObject["result"] = "НЕ"
      }

      examObject["date"] = format(exam.date, "dd.MM.yyyy")
      examObject["id"] = exam._id
      examFormatted.push(examObject)
    })
    res.send(examFormatted)
}

async function deleteTransaction(req:express.Request,res:express.Response){
  const {id} = req.body
  await Transaction.deleteOne({_id:id});
}

async function getAllTransactions(req:express.Request,res:express.Response) {
  const params = parseQueryParams(req.originalUrl)
  const transactions = await Transaction.find({candidate:params.id}).lean()
  let formatedTransactions:any = []
  transactions.map((transaction)=>{
    formatedTransactions.push({date:format(transaction.date,"dd.MM.yyyy"),sum:transaction.sum,id:transaction._id})
  })
  
  res.send(formatedTransactions)
}

async function getProfileId(req:express.Request,res:express.Response){
  const id = getIdFromCookie(req,res);
  res.send({id:id})
}

async function deleteExam(req:express.Request,res:express.Response){
  
  await Exam.deleteOne({_id:req.body.id})
  res.sendStatus(StatusCodes.OK)
}

export default {getAllExams,signNewExam,makeTransaction,getUserProfileInfo,deleteTransaction,getAllTransactions,getProfileId,deleteExam}