import express from "express";
import User, { userType } from "../models/user.models"
import {getCookie} from "../utils/auth.utils"
import jwt from "jsonwebtoken";
import Document from "../models/document.model"
import Car from "../models/car.model";
import { StatusCodes } from "http-status-codes";
import Transaction from "../models/transactions.model";
import Exam from "../models/exams.model"
import {parseQueryParams} from "../utils/query.utils"
import {Candidate} from "../interfaces/candidates.interface"

const getCandidates = async (req:express.Request,res:express.Response) =>{
  
  //extracts all of the information that is needed
  let info:Candidate[] = [] 
  const allCandidates = await User.find({role:"user"}).lean();

  for(let i = 0; i < allCandidates.length;i++){
    info.push({
      firstName: allCandidates[i].firstName,
      surname: allCandidates[i].surname,
      lastName: allCandidates[i].lastName,
      _id:allCandidates[i]._id.toString(),
    });
  }

  res.send(info)
  
};

interface signInReq extends express.Request {
  user: userType;
}


const isSignInReq = (req: express.Request): req is signInReq => {
  return (req as any)?.user !== null;
}

const signNewClass = async (req: express.Request, res: express.Response) => {
  if(!isSignInReq(req)){
    res.status(422)
  }

  const {id,date,hours,minutes,longHour} = req.body;
  
  let token = getCookie("access",req,res)
  let {payload} = jwt.decode(token);
  
  let emailInstructor = payload 
  
  let addingHoursAndMinutes = new Date(date).getTime() + hours*60*60*1000 + minutes*60*1000 
  let startDate = new Date(addingHoursAndMinutes)

  addingHoursAndMinutes += parseInt(longHour)*60*1000;
  let finalDate = new Date(addingHoursAndMinutes)
  
  //TODO има разлика във времевите зони сървър-utc фронтенд- utc+2
  //TODO сложи ид в пайлоуда
  await User.findOneAndUpdate({_id:id},  
    { 
    $push: { dates: { startDate: startDate, name: emailInstructor,finalDate:finalDate} }  
    });
  
  await User.findOneAndUpdate({email:emailInstructor},  
    { 
    $push: { dates: { startDate: startDate, name: id,finalDate:finalDate} }  
    });

  res.send({ok:'ok'})
  return;
}

const getAllClasses = async (req:express.Request,res:express.Response) =>{
  
  let token = getCookie("access",req,res);
  
  let {payload} = jwt.decode(token)
  
  let date = new Date(req.body.searchedDate);
  
  let firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  let lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(),date.getDate()+1));


  const classPipeline = [
    {
      $unwind: "$dates"
    },
    {
      $match: {
        "dates.date": {
          $gte: firstDay,  
          $lte: lastDay    
        },
        email:payload
      }
    },
    {
      // Step 3: Project only the 'dates' subdocument and exclude the whole document
      $project: {
        _id: 0,            // Exclude the main document _id (optional)
        dates: 1           // Only include the filtered 'dates' subdocument
      }
    }
  ];
 
  
  let dates = await User.aggregate(classPipeline)
  // .map() е за да махне dates:{} обекта
  const mappedDates =  dates.map(item => item.dates); 
  
  res.send(JSON.stringify(mappedDates))
}

const createNewDocument = (req:express.Request,res:express.Response) =>{
  const {type,name,description,relatedTo,date} = req.body
  const newDocument = new Document({
    type:type,
    name:name,
    description:description,
    relatedTo:relatedTo,
    date:date
  })
  newDocument.save()
  res.status(200).send("ok")
}

const getAllDocuments = async (req:express.Request,res:express.Response) => {
  const documents = await Document.find({})
  res.status(200).send(documents)
}
const getAllInstructors = async(req:express.Request,res:express.Response)=>{
  const instructorsArray = []
  const instructors = await User.find({role:"admin"})
  for(let i = 0; i < instructors.length; i++){
    instructorsArray.push({id:instructors[i].id,name:instructors[i].email})
  }
  res.status(200).send(instructorsArray)
}
const addCar = async(req:express.Request,res:express.Response) => {
  const {brand,model,registration} = req.body;
  if(await Car.findOne({_id:registration}) != null){
    res.status(StatusCodes.CONFLICT).json({message:"Кола с този номер вече съществува"})
  }
  else{
    const car = new Car({
      _id:registration,
      brand:brand,
      model:model,
    })

    car.save()
  }
}

const getAllCars = async(req:express.Request,res:express.Response) =>{
  const cars = await Car.find({});
  res.status(200).send(cars)
}
const getNotifications = async(req:express.Request,res:express.Response) =>{
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

const deleteDocuments = async (req:express.Request,res:express.Response) =>{
  const {id} = req.body
  await Document.deleteOne({_id:id});
}

const deleteCar = async(req:express.Request,res:express.Response) => {
  const {id} = req.body
  await Car.deleteOne({_id:id})
}

const searchCandidates = async(req:express.Request,res:express.Response) =>{
  interface Candidate {
    firstName:string,
    lastName:string,
    surname:string,
    _id:string
  }

  const {name} = req.body
  let names = name.split(" ")

  let candidates;
  let formatedCandidates:Candidate[] = [];

  for(let i = 0; i < names.length;i++){
    let lowerCaseName = names[i].toLowerCase();
    names[i] = lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1)    
  }
  
  if(names.length == 3){
    candidates = await User.find({firstName:names[0],surname:names[1],lastName:names[2]})
  }
  else if(names.length == 2){
    candidates = await User.find({firstName:names[0],lastName:names[1]})
  }
  else if(names.length == 1){
    candidates = await User.find({firstName:names[0]}).lean()
  }

  for(let i = 0; i < candidates.length;i++){
    formatedCandidates.push({
      firstName:candidates[i].firstName,
      lastName:candidates[i].lastName,
      surname:candidates[i].surname,
      _id:candidates[i]._id,
    })
  }

  res.send(formatedCandidates)
}

async function getUserInfo(req:express.Request,res:express.Response){
  const {id} = req.body
  let user = await User.findById({_id:id})
  let {firstName,surname,lastName} = user;
  let transactions = await Transaction.find({candidate:id}).lean()
  let transactionsInfo:any[] = []

  
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
  /*
  ако е теоритичен и няма взет -> записва
  ако е теоритичен и има взет -> не записва
  ако е практически и няма взет теоритичен -> не записва
  ако е практически и има взет теоритичен -> записва
  */

  const {type,result,id} = req.body

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
  let examFormatted:object[] = []
  const response = await Exam.find({candidate:candidateId})
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
async function createCorporation(req:express.Request,res:express.Response) {
  
}

export default {getCandidates, signNewClass,getAllClasses,createNewDocument,getAllDocuments,getAllInstructors,addCar,getAllCars,getNotifications,deleteDocuments,searchCandidates,getUserInfo,makeTransaction,signNewExam,getAllExams,createCorporation}