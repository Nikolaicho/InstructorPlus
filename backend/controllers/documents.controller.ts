import express from "express";
import Document from "../models/document.model"
import User from "../models/user.models"
import Car from "../models/car.model";
import { StatusCodes } from "http-status-codes";
import {getCorporationFromCookie} from "../utils/token.utils"
import { format } from "date-fns";

const createNewDocument = (req:express.Request,res:express.Response) =>{
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
    organization:"1233",
  })

  newDocument.save()

  res.status(StatusCodes.OK).json({message:"document added successfully"})
}
  
const getAllDocuments = async (req:express.Request,res:express.Response) => {
  let organization = getCorporationFromCookie(req,res)
  const documents = await Document.find({organization})
  const now = new Date(); // Get the current date and time
  const oneWeekLater = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7)
  const oneMonthLater = new Date(now.getFullYear(), now.getMonth()+1, now.getDate())

  let formatedDocuments = []

  documents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  documents.map((document:any,index:number)=>{
    let mark = '';
    if(document.date.getTime() < oneWeekLater.getTime()){
      mark = "Критично"
    }
    else if(document.date.getTime() < oneMonthLater.getTime()){
      mark = "Опасно"
    }
    else{
      mark = "Безопасно"
    }
    formatedDocuments.push({
      id:document._id.toString(),
      name:document.name,
      date:format(document.date,"dd.MM.yyyy"),
      relatedTo:document.relatedTo,
      mark:mark,
    })
  })
  res.status(StatusCodes.OK).send(formatedDocuments)
}
const getAllInstructors = async(req:express.Request,res:express.Response)=>{
  //TODO направи интерфейс за масива
  //TODO make getting instructors possible only for your corporation
    const instructorsArray = []
    const instructors = await User.find({role:"admin"})
    for(let i = 0; i < instructors.length; i++){
      instructorsArray.push({id:instructors[i].id,name:instructors[i].email})
    }
    res.status(StatusCodes.OK).send(instructorsArray)
}
const addCar = async(req:express.Request,res:express.Response) => {
  //TODO направи колите да се добавят към дадена фирма
  const {data} = req.body
  const {brand,model,registration} = data;

  let organization = getCorporationFromCookie(req,res)
  if(brand == undefined || model == undefined || registration == undefined){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни данни за кола"})
    return
  }

  //А, В, Е, К, М, Н, О, Р, С, Т, У, Х,
  //TODO провери пак дали си взел всички начални префиксове за номерата
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
      orginazation:organization,
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