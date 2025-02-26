import {useEffect, useState} from "react";
import NavBar from "./NavBar";
import useAddDocument from "../hooks/Documents/useAddDocument";
import useAddCar from "../hooks/Documents/useAddCar";
import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors"  
import useGetAllDocuments from "../hooks/Documents/useGetAllDocuments"
import useGetAllCars from "../hooks/Documents/useGetAllCars";
import useDeleteDocument from "../hooks/Documents/useDeleteDocument";
import {Car,Instructor} from "../interfaces/documents.interface"
import useCreateInstructor from "../hooks/Documents/useCreateInstructor";
import SideBar from "./SideBar";
import PopUpForm from "./PopUpForm";
import PopUpAdd from "./PopUpAdd";
import PopUpDocument from "./PopUpDocument"
import DeleteIcon from '@mui/icons-material/Delete';
import PopUpDelete from "./PopUpDelete";


function Documents() {
  const [activeButton,setActiveButton] = useState<number>(0)
  const { addDocument } = useAddDocument();
  const {documents,setDocuments} = useGetAllDocuments();
  const {deleteDocument} = useDeleteDocument();
  const {createInstructor} = useCreateInstructor()
  const {addCar,errorMessage } = useAddCar()
  
  const deleteClassFromUI = (index:number) => {
    if(documents != undefined){
      let docs = [...documents]
      docs.splice(index,1)
      setDocuments(docs)
    }
  }
  return(<>
        <NavBar/>
        <div className = "flex">
        <SideBar/>
        <div className = "flex flex-col">

          <div className = "flex justify-around w-[85vw] font-bold ">
          <div className = "bg-gray-400 w-[250px] h-[30px] py-4 text-center rounded-xl flex items-center justify-center mt-2 hover:bg-gray-300 cursor-pointer border-2 border-black"onClick={()=>{
              setActiveButton(1)
            }}>Повиши към инструктор</div>
            <div className = "bg-gray-400 w-[250px] h-[30px] py-4 text-center rounded-xl flex items-center justify-center mt-2 hover:bg-gray-300 cursor-pointer border-2 border-black"onClick={()=>{
              setActiveButton(2)
            }}>Премахни инструктор</div>
            <div className = "bg-gray-400 w-[250px] h-[30px] py-4 text-center rounded-xl flex items-center justify-center mt-2 hover:bg-gray-300 cursor-pointer border-2 border-black"onClick={()=>{
              setActiveButton(3)
            }}>Добави кола</div>
            <div className = "bg-gray-400 w-[250px] h-[30px] py-4 text-center rounded-xl flex items-center justify-center mt-2 hover:bg-gray-300 cursor-pointer border-2 border-black"onClick={()=>{
              setActiveButton(4)
            }}>Премахни кола</div>
            <div className = "bg-gray-400 w-[250px] h-[30px] py-4 text-center rounded-xl flex items-center justify-center mt-2 hover:bg-gray-300 cursor-pointer border-2 border-black"onClick={()=>{
              setActiveButton(5)
            }}>Създай документ</div>

            </div>
              <div className = "flex ml-8">
                {documents ? documents.map((document:any,index:number)=>(
                  <div className = "w-[200px] h-[150px] bg-white border-2 border-black  mt-4 mr-4 ">
                    <div className = {`${document.mark == "Безопасно" ? "bg-green-500" : document.mark == "Опасно" ? "bg-orange-600": document.mark == "Критично" ? "bg-red-600":""} text-center font-semibold border-b border-black`}>
                      {document.mark}
                    </div>
                    <div className = "text-center my-[5px]">
                      {document.name}
                    </div>
                    <div className = "text-center my-[5px]">
                      {document.relatedTo}
                    </div>
                    <div className = "text-center my-[5px]">
                      {document.date}
                    </div>
                    <div className = "flex justify-between mx-2">
                      <DeleteIcon onClick={()=>{
                      deleteDocument(document.id)
                      deleteClassFromUI(index)
                      }}/>
                    </div>
                    </div>
                )) :<></>}
              </div>
            </div>

          
        
            {activeButton === 1 
            ? <PopUpAdd rows={["Потребителско ID"]} submitFunc = {createInstructor} jsonFields = {["id"]} setButton = {setActiveButton}/>
            :activeButton === 2
            ?<PopUpDelete type = "person" submitFunc = {createInstructor} jsonFields = {["id"]} setButton = {setActiveButton}/>
            : activeButton === 3 
            ? <PopUpAdd rows={["Марка","Модел","Рег.номер"]} submitFunc={addCar} jsonFields = {["brand","model","registration"]} setButton = {setActiveButton}/>
            : activeButton === 4
            ? <PopUpDelete type = "car" submitFunc={createInstructor} jsonFields = {["registration"]} setButton = {setActiveButton}/>
            :activeButton === 5
            ? <PopUpDocument rows={["Документ"]} submitFunc={addDocument} jsonFields={["documentName","relatedTo","date"]} setButton = {setActiveButton}/>   
            :<></>     
            } 

      </div>
  </>)  
}
export default Documents;

/*

 //imports
  const {instructors} = useGetAllInstructors()
  const {cars} = useGetAllCars()
  
  

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
            {instructors?.map((instructor:Instructor,key:number)=>(
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
            {cars?.map((car:Car,key:number)=>(
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
          
          addCar(brand,model,registration)
          
          
        }}>zadai</div>
    </>
  );
  */