import {Candidate} from "../interfaces/candidates.interface"
import express from "express";
import User, { userType } from "../models/user.models"
import {getCookie} from "../utils/auth.utils"
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

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
    
    //getting the time for the start of the lesson
    let addingHoursAndMinutes = new Date(date).getTime() + hours*60*60*1000 + minutes*60*1000 
    let startDate = new Date(addingHoursAndMinutes)

    //adding the duration of the lesson (either 50 mins or 100 mins)
    addingHoursAndMinutes += parseInt(longHour)*60*1000;
    let finalDate = new Date(addingHoursAndMinutes)
    

    //TODO има разлика във времевите зони сървър-utc фронтенд- utc+2
    //TODO сложи ид в пайлоуда


    //pushing the start of the lesson and the end of it to the instructor and user in the database
    await User.findOneAndUpdate({_id:id},  
      { 
      $push: { dates: { startDate: startDate, name: emailInstructor,finalDate:finalDate} }  
      });
    
    await User.findOneAndUpdate({email:emailInstructor},  
      { 
      $push: { dates: { startDate: startDate, name: id,finalDate:finalDate} }  
      });
  
    res.status(StatusCodes.OK).send("Class signed successfully")
    return;
}

const getAllClasses = async (req:express.Request,res:express.Response) =>{
  
    let token = getCookie("access",req,res);
    
    let {payload} = jwt.decode(token)
    
    //getting searched date in date object
    let date = new Date(req.body.searchedDate);
    
    //getting the dates I search for classes
    //for example the searched date is 26/11/2024
    //i am getting the time between 26/11/2024 00:00 and 27/11/2024 00:00
    let firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(),date.getDate()+1));
  
    //pipeline that gets me only dates field from the user in the DB
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
        $project: {
          _id: 0,            
          dates: 1           
        }
      }
    ];
   
    
    let dates = await User.aggregate(classPipeline)
    //TODO
    //.map() removes dates:{} 
    const mappedDates =  dates.map(item => item.dates); 
    
    res.send(JSON.stringify(mappedDates))
}

const searchCandidates = async(req:express.Request,res:express.Response) =>{
    const {name} = req.body
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
      candidates = await User.find({firstName:names[0]}).lean()
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

export default {getCandidates,signNewClass,getAllClasses,searchCandidates}