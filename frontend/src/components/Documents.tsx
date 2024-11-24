import {useEffect, useState} from "react";
import NavBar from "./NavBar";
import useAddDocument from "../hooks/Documents/useAddDocument";
import useAddCar from "../hooks/Documents/useAddCar";
import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors"  
import useGetAllDocuments from "../hooks/Documents/useGetAllDocuments"
import useGetAllCars from "../hooks/Documents/useGetAllCars";
import useDeleteDocument from "../hooks/Documents/useDeleteDocument";

interface Instructor {
  id:string,
  name:string,
}
interface Car{
  _id:string,
  brand:string,
  model:string,
}

function Documents() {

  //imports
  const { addDocument } = useAddDocument();
  const {addCar,errorMessage } = useAddCar();
  const {instructors} = useGetAllInstructors()
  const {cars} = useGetAllCars()
  const {isDocumentsLoaded,documents} = useGetAllDocuments();
  const {deleteDocument} = useDeleteDocument();

  //document property
  const [documentType,setDocumentType] = useState<string>("firm")
  const [documentName,setDocumentName] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [entityId,setEntityId] = useState<string>()
  const [date,setDate] = useState<Date>(new Date())

  // states for GUI
  const [isPersonalSelected,setIsPersonalSelected] = useState<boolean>()
  const [isFirmSelected,setIsFirmSelected] = useState<boolean>()
  const [isVehicleSelected,setIsVehicleSelected] = useState<boolean>()

  //car property
  const [brand,setBrand] = useState<string>("")
  const [model,setModel] = useState<string>("")
  const [registration,setRegistration] = useState<string>("")
  

  
  useEffect(()=>{
    if(documentType == "personal"){
      setIsPersonalSelected(true)
      setIsFirmSelected(false)
      setIsVehicleSelected(false)
    }
    if(documentType == "firm"){
      setIsPersonalSelected(false)
      setIsFirmSelected(true)
      setIsVehicleSelected(false)
    }
    if(documentType == "vehicle"){
      setIsPersonalSelected(false)
      setIsFirmSelected(false)
      setIsVehicleSelected(true)
    }
  },[documentType])

  return (
    <>
      <NavBar />  
        <select onChange={(e)=>{
          setDocumentType(e.target.value)
        }}>Категория
          <option value="firm">Фирмени</option>
          <option value="personal">Инструкторски</option>
          <option value="vehicle">Автомобилни</option>
        </select>
        <div>
          име на документ:
          <input className="border-2 border-green-400" onChange={(e)=>{
            setDocumentName(e.target.value)
          }}></input>
        </div>
        <div>
          описание
          <input className="border-2 border-green-400" onChange={(e)=>{
            setDescription(e.target.value)
          }}></input>
        </div>
        {isPersonalSelected ? <div>
          Инструктор
          
          <select onChange={(e)=>{
            setEntityId(e.target.value)
          }}>
            {instructors.map((instructor:Instructor,key:number)=>(
              <option value={instructor.id} >{instructor.name}</option>
            ))}
          </select>
        </div>:<></>}
        {isVehicleSelected ? <div>
          Кола
          <div>
          
        </div>
          <select onChange={(e)=>{
           setEntityId(e.target.value)
          }}>
            {cars.map((car:Car,key:number)=>(
              <option value={car._id} >{car.brand} {car.model} {car._id}</option>
            ))}
          </select>
        </div>:<></>}
        <input type="date" id="date" name="date" onChange={(e)=>{
          
        }}></input>
        <div className="flex">
        <div
          className="justify-start bg-green-600 p-2"
          onClick={() => {
            addDocument(documentType,documentName,description,entityId,date);
          }}
        >
          Добави
        </div>
        </div>
        <div className="flex flex-col w-20">
          Marka
          <input className="border-2 border-black"onChange={(e)=>{
          setBrand(e.target.value)
        }}></input>
        model
          <input className="border-2 border-black" onChange={(e)=>{
          setModel(e.target.value)
        }}></input>
          <input className="border-2 border-black"onChange={(e)=>{
          setRegistration(e.target.value)
        }}></input>
        {errorMessage}
        </div>
        <div className="bg-green-300 border-2 border-black" onClick={()=>{
          const pattern = /^[А-Я]{1,2}\d{4}[А-Я]{2}$/;
          if(pattern.test(registration)){
            addCar(brand,model,registration)
          }
          
        }}>zadai</div>
    </>
  );
}
export default Documents;
