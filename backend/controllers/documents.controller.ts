import express from "express";
import Document from "../models/document.model"
import User from "../models/user.models"
import Car from "../models/car.model";
import { StatusCodes } from "http-status-codes";
import {getCorporationFromCookie} from "../utils/token.utils"
import { format } from "date-fns";

const createNewDocument = async(req:express.Request,res:express.Response) =>{
  const {data} = req.body
  const {documentName,relatedTo,date} = data
  let organization = getCorporationFromCookie(req,res)
  if(documentName == undefined || date == undefined || relatedTo == undefined){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни данни за документ"})
    return;
  }
  
  const newDocument = new Document({
    name:documentName,
    relatedTo:relatedTo,
    date:date,
    organization:organization,
  })

  newDocument.save()

  res.status(StatusCodes.OK)
}
  
const getAllDocuments = async (req:express.Request,res:express.Response) => {
  let organization = getCorporationFromCookie(req,res)
  const documents = await Document.find({organization})
  const now = new Date(); // Get the current date and time
  const oneWeekLater = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7)
  const oneMonthLater = new Date(now.getFullYear(), now.getMonth()+1, now.getDate())

  let formatedDocuments = []

  documents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  for(let i = 0; i < documents.length ; i++){
    let mark = '';
    if(documents[i].date.getTime() < oneWeekLater.getTime()){
      mark = "Критично"
    }
    else if(documents[i].date.getTime() < oneMonthLater.getTime()){
      mark = "Опасно"
    }
    else{
      mark = "Безопасно"
    }
    if(documents[i].relatedTo.length > 8){
      let user = await User.findById({_id:documents[i].relatedTo})
      formatedDocuments.push({
        id:documents[i]._id.toString(),
        name:documents[i].name,
        date:format(documents[i].date,"dd.MM.yyyy"),
        relatedTo:`${user.firstName} ${user.lastName}`,
        mark:mark,
      })
    }
    else{
      formatedDocuments.push({
        id:documents[i]._id.toString(),
        name:documents[i].name,
        date:format(documents[i].date,"dd.MM.yyyy"),
        relatedTo:documents[i].relatedTo,
        mark:mark,
      })
    }
  }
  res.status(StatusCodes.OK).send(formatedDocuments)
}
const getAllInstructors = async(req:express.Request,res:express.Response)=>{
    const instructorsArray = []
    const organization = getCorporationFromCookie(req,res)
    const instructors = await User.find({role:"admin",organization:organization})

    for(let i = 0; i < instructors.length; i++){
      instructorsArray.push({id:instructors[i].id,firstName:instructors[i].firstName,lastName:instructors[i].lastName})
    }
    res.status(StatusCodes.OK).send(instructorsArray)
}
const addCar = async(req:express.Request,res:express.Response) => {
  const {data} = req.body
  const {brand,model,registration} = data;

  let organization = getCorporationFromCookie(req,res)
  if(brand == undefined || model == undefined || registration == undefined){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни данни за кола"})
    return
  }

  //А, В, Е, К, М, Н, О, Р, С, Т, У, Х,

  let regexNumberPlate = /^(ВН|М|ВР|ЕН|ВТ|Р|Т|РР|СС|ТХ|Н|В|ЕВ|ОВ|СО|С|СА|СВ|РВ|СТ|СН|А|У|Х|К|СМ|Е|КН|РК)\d{4}[АВЕКМНОРСТУХ]{2}$/
  if(!regexNumberPlate.test(registration)){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидна регистрация"})
  }

  //this checks if car with this registration exists
  if(await Car.findOne({_id:registration}) != null){
    res.status(StatusCodes.CONFLICT).json({message:"Кола с този регистрационен номер вече съществува"})
  }
  //creates car
  else{
    const car = new Car({
      _id:registration,
      brand:brand,
      model:model,
      organization:organization,
    })
  
    car.save()
    res.status(StatusCodes.OK).json({message:"Колата регистрирана успешно"})
  }
}
  
const getAllCars = async(req:express.Request,res:express.Response) =>{
  let organization = getCorporationFromCookie(req,res)
  const cars = await Car.find({organization});
  if(cars.length == 0){
    res.status(StatusCodes.NOT_FOUND).json({message:"Няма намерени автомобили"})
    return;
  }

  res.status(StatusCodes.OK).send(cars)
}

const deleteDocuments = async (req:express.Request,res:express.Response) =>{
    const {id} = req.body

    if(id == undefined){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидно id"})
      return;
    }

    //TODO провери дали работи като хората
    if(await Document.findById({_id:id}) == null){
      res.status(StatusCodes.NOT_FOUND).json({message:"Няма документ с такъв идентификационен номер"})
    }

    await Document.deleteOne({_id:id});
}
  
const deleteCar = async(req:express.Request,res:express.Response) => {
    const {id} = req.body

    if(id == undefined){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидно id"})
      return;
    }

    //TODO провери дали работи като хората
    if(await Car.findById({_id:id}) == null){
      res.status(StatusCodes.NOT_FOUND).json({message:"Няма автомобил с такъв идентификационен номер"})
    }

    await Car.deleteOne({_id:id})
}

async function createInstructor(req:express.Request,res:express.Response){
  const {data} = req.body
  const {id} = data
  let userToBePromoted = await User.findById({_id:id})
  userToBePromoted.role = "admin"
  userToBePromoted.save();
}

export default {createNewDocument,getAllDocuments,getAllCars,getAllInstructors,deleteCar,deleteDocuments,addCar,createInstructor}