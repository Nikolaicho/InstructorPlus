import express from "express";
import Document from "../models/document.model"
import User from "../models/user.models"
import Car from "../models/car.model";
import { StatusCodes } from "http-status-codes";

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
  //TODO направи интерфейс за масива
    const instructorsArray = []
    const instructors = await User.find({role:"admin"})
    for(let i = 0; i < instructors.length; i++){
      instructorsArray.push({id:instructors[i].id,name:instructors[i].email})
    }
    res.status(200).send(instructorsArray)
}
const addCar = async(req:express.Request,res:express.Response) => {
    const {brand,model,registration} = req.body;

    //this checks if car with this registration exists
    if(await Car.findOne({_id:registration}) != null){
      res.status(StatusCodes.CONFLICT).json({message:"Кола с този номер вече съществува"})
    }
    //creates car
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

const deleteDocuments = async (req:express.Request,res:express.Response) =>{
    const {id} = req.body
    await Document.deleteOne({_id:id});
}
  
const deleteCar = async(req:express.Request,res:express.Response) => {
    const {id} = req.body
    await Car.deleteOne({_id:id})
}

export default {createNewDocument,getAllDocuments,getAllCars,getAllInstructors,deleteCar,deleteDocuments,addCar}