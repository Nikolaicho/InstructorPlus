import express from "express";
import Document from "../models/document.model"
import User from "../models/user.models"
import Car from "../models/car.model";
import { StatusCodes } from "http-status-codes";

const createNewDocument = (req:express.Request,res:express.Response) =>{
    const {type,name,description,relatedTo,date} = req.body

    if(type == undefined || name == undefined || description == undefined || relatedTo == undefined || date == undefined){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидни данни за документ"})
      return;
    }

    const newDocument = new Document({
      type:type,
      name:name,
      description:description,
      relatedTo:relatedTo,
      date:date
    })

    newDocument.save()

    res.status(StatusCodes.OK).json({message:"document added successfully"})
}
  
const getAllDocuments = async (req:express.Request,res:express.Response) => {
  //TODO make getting document possible only for your corporation
    const documents = await Document.find({})
    res.status(200).send(documents)
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
    const {brand,model,registration} = req.body;

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
      })
  
      car.save()
      res.status(StatusCodes.OK).json({message:"Колата регистрирана успешно"})
    }
}
  
const getAllCars = async(req:express.Request,res:express.Response) =>{
  //TODO направи така че да намираш коли само от твоята фирма и да казваш ако няма никакви коли 
    const cars = await Car.find({});
    res.status(200).send(cars)
}

const deleteDocuments = async (req:express.Request,res:express.Response) =>{
  //TODO направи така че да праща отговор на клиента ако няма документ с такова ид
    const {id} = req.body
    if(id == undefined){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Невалидно id"})
      return;
    }
    await Document.deleteOne({_id:id});
}
  
const deleteCar = async(req:express.Request,res:express.Response) => {
    const {id} = req.body
    await Car.deleteOne({_id:id})
}

export default {createNewDocument,getAllDocuments,getAllCars,getAllInstructors,deleteCar,deleteDocuments,addCar}