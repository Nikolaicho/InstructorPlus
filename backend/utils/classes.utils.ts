import mongoose from "mongoose";
import User from "../models/user.models";

//this method is to be used in both functions - getAllClasses and timeLeft
const getAllClassesAggregator = async (searchedDate:number,InstructorId:string) => {
    //getting searched date in date object
    let date = new Date(searchedDate);
  
    //getting the dates I search for classes
    //for example the searched date is 26/11/2024
    //i am getting the time between 26/11/2024 00:00 and 27/11/2024 00:00
    let firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(),date.getDate()+1));

    interface ClassDates {
      finalDate:Date,
      startDate:Date,
      name:string,
    }
    //pipeline that gets me only dates field from the user in the DB
    const classPipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(InstructorId),
        },
      },
      {
        $unwind: "$dates", // Breaks the array into individual objects
      },
      {
        $match: {
          "dates.finalDate": {
            $gte: firstDay,
            $lte: lastDay,
          },
        },
      },
      {
        $project: {
          _id: 0,
          dates: 1,
        },
      },
      {
        $sort: { "dates.finalDate": 1 }, // Explicitly reference the nested field
      },
    ];
    
    let dates = await User.aggregate(classPipeline)
    //TODO
    //.map() removes dates:{} 
    return dates.map(item => item.dates)
}

const checkIfDateIsValid = async(instructorId:string,userId:string,date:string,hours:string,minutes:string,longHour:string) => {

    let tenMinutes = 10 * 60 * 1000 // the minimum between two candidates' lessons
    let startOfTheNewLesson = new Date(date).getTime() + parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000 
    let finalOfTheNewLesson = new Date(date).getTime() + parseInt(hours) * 60 * 60 * 1000 + (parseInt(minutes) + parseInt(longHour)) * 60 * 1000
    
    let dates = await getAllClassesAggregator(new Date(date).getTime(),instructorId)

    let candidatesMinutes = candidateTime(dates,userId);
    
    //if minutes are 100 the maximum is reached
    if(candidatesMinutes >= 100){
      return false
    }
    //if candidateMinutes + the minutes of the new lesson is bigger than 100 it is also prohibited to sign new lesson
    else if((candidatesMinutes + (finalOfTheNewLesson - startOfTheNewLesson)/60 / 1000 ) > 100){
      return false
    }

    //if dates == [] new lesson can be signed without problem at any time 
    if(dates.length == 0){
      return true
    }
    
    for(let i = 0; i < dates.length; i++){
      let currentDateStartMilliseconds = dates[i].startDate.getTime()
      let currentDateFinalMilliseconds = dates[i].finalDate.getTime();

      //checks if there is lessons after the allocated time and if there is at least 10 minutes between the final of the new lesson
      //and the start of the one after it
      if(currentDateStartMilliseconds > finalOfTheNewLesson && currentDateStartMilliseconds - tenMinutes >= finalOfTheNewLesson){
        if(i != 0){

          //checks if there is enough time from the new lesson to the one after it
          let previousLessonFinalMilliseconds = dates[i-1].finalDate.getTime()
          if(previousLessonFinalMilliseconds + tenMinutes <= startOfTheNewLesson){
            return true
          }
        }
        else{
          return true
        }
      }
      
      //if i == the last lesson and the final of the current selected date is at least 10 minutes before the start 
      // of the new lesson it is also ok
      else if(i == dates.length - 1 && currentDateFinalMilliseconds + tenMinutes <= startOfTheNewLesson){
        return true
      }
    }
    return false
}

//TODO dates
const candidateTime = (dates:any[],userId:string) =>{
  let learningMinutes = 0
  dates.map((date)=>{
    if(date.name == userId){
      let start = date.startDate.getTime();
      let final = date.finalDate.getTime();
      learningMinutes += (final - start) / 60 / 1000 // turning it in minutes
    }
  })
  return learningMinutes
} 

export default {getAllClassesAggregator,checkIfDateIsValid}