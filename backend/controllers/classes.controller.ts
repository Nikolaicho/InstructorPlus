import {Candidate} from "../interfaces/candidates.interface"
import express from "express";
import User, { userType } from "../models/user.models"
import {getCookie} from "../utils/auth.utils"
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import parseQueryParams from "../utils/query.utils";
import mongoose from "mongoose";
import { ClassDates } from "../interfaces/classDates.interface";
import classesUtils from "../utils/classes.utils"

const getCandidates = async (req:express.Request,res:express.Response) =>{
    //extracts all of the information that is needed for the candidates to display properly
    let info:Candidate[] = [];
    const allCandidates = await User.find({role:"user"}).lean();

    for(let i = 0; i < allCandidates.length;i++){
      info.push({
        firstName: allCandidates[i].firstName,
        surname: allCandidates[i].surname,
        lastName: allCandidates[i].lastName,
        _id:allCandidates[i]._id.toString(),
      });
    }
    res.send(info); 
};


  

  
const signNewClass = async (req: express.Request, res: express.Response) => {
   
    //id - userId 
    const {id,date,hours,minutes,longHour} = req.body;
    console.log(hours,minutes)
    if(id == undefined || date == undefined || (hours == undefined || hours == null)|| minutes == undefined || longHour ==undefined){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни данни за часа"})
      return;
    }

    let token = getCookie("access",req,res)
    let decodedToken = jwt.decode(token);
    
    let idInstructor = decodedToken.id

    //checks if the date for the lesson is valid
    if(await classesUtils.checkIfDateIsValid(idInstructor,id,date,hours,minutes,longHour) == false){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалиден час"})
      return;
    }
    
    //getting the time for the start of the lesson
    let addingHoursAndMinutes = new Date(date).getTime() + hours*60*60*1000 + minutes*60*1000 
    let startDate = new Date(addingHoursAndMinutes)

    //adding the duration of the lesson (either 50 mins or 100 mins)
    addingHoursAndMinutes += parseInt(longHour)*60*1000;
    let finalDate = new Date(addingHoursAndMinutes)

    //TODO има разлика във времевите зони сървър-utc фронтенд- utc+2

    //pushing the start of the lesson and the end of it to the instructor and user in the database
    await User.findOneAndUpdate({_id:id},  
      { 
      $push: { dates: { startDate: startDate, name: idInstructor,finalDate:finalDate} }  
      });
    
    await User.findOneAndUpdate({_id:idInstructor},  
      { 
      $push: { dates: { startDate: startDate, name: id,finalDate:finalDate} }  
      });
  
    res.status(StatusCodes.OK).send("Class signed successfully")
    return;
}

const getAllClasses = async (req:express.Request,res:express.Response) =>{
    let token = getCookie("access",req,res);
    
    let {id} = jwt.decode(token)

    res.send(JSON.stringify(await classesUtils.getAllClasses(req.body.searchedDate,id)))
}



const searchCandidates = async(req:express.Request,res:express.Response) =>{
    const {name} = req.body
    if(name == undefined || name == null){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидно търсене"})
    }
    //splits given names to determine how many are they
    let names = name.split(" ")
  
    let candidates;
    //Array that holds candidates that are ready to be displayed in the frontend
    let formatedCandidates:Candidate[] = [];

    //making the first letter of the names given capital and the other lowercase so the input of the user is not case sensitive
    for(let i = 0; i < names.length;i++){
      let lowerCaseName = names[i].toLowerCase();
      names[i] = lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1)    
    }
    
    //depending on the number of names there is search for the full name or partial
    if(names.length == 3){
      candidates = await User.find({firstName:names[0],surname:names[1],lastName:names[2]})
    }
    else if(names.length == 2){
      candidates = await User.find({firstName:names[0],lastName:names[1]})
    }
    else if(names.length == 1){
      candidates = await User.find({firstName:names[0]})
    }
    
    //getting the info that is needed for the frontend 
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

const timeLeft = async(req:express.Request,res:express.Response) => {
  let fullWorkDay = 500 * 60 * 1000 //500 minutes in miliseconds (10 learning hours)

  let params = parseQueryParams(req.originalUrl)
  if(params == undefined){
    res.send(StatusCodes.BAD_REQUEST).json({message:"Невалидна заявка"})
  }

  let searchedDate = parseInt(params.searchedDate)
  let cookie = getCookie("access",req,res)
  let id = jwt.decode(cookie).id

  let dates:ClassDates[] = await classesUtils.getAllClasses(searchedDate,id)
  dates.map((date)=>{
    fullWorkDay -= date.finalDate.getTime()-date.startDate.getTime()
  })
  
  res.send({workTimeLeft:fullWorkDay})
}

export default {getCandidates,signNewClass,getAllClasses,searchCandidates,timeLeft}