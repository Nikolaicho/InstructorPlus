import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors";
import useGetAllCars from "../hooks/Documents/useGetAllCars";
import useGetAllDocuments from "../hooks/Documents/useGetAllDocuments";

interface FormDocumentsProps {
    rows: string[]; 
    submitFunc: (data:any) => void;
    jsonFields: Array<string>,
    setButton: React.Dispatch<React.SetStateAction<number>>;
  }

const FormDocuments: React.FC<FormDocumentsProps> = ({rows,submitFunc,jsonFields,setButton}) => {
    const [formData,setFormData] = useState<any>({})
    const [documentType,setDocumentType] = useState<string>("firm")
    const {instructors} = useGetAllInstructors()
    const {cars} = useGetAllCars()
    const {documents,setDocuments} = useGetAllDocuments()
    const [trigger,setTrigger] = useState(false)
    const [newDoc,setNewDoc] = useState<any>()
    
    const handleChange = (field: string, value: string) => {
      const updatedData = formData;
      updatedData[field] = value; 
      setFormData(updatedData);
    };
    const addDocumentToUI = async (newDoc: any) => {
      const resolvedDoc = await newDoc;
      setDocuments((prevDocs=[]) => [...prevDocs, resolvedDoc]);
    };

    useEffect(() => {
      addDocumentToUI(newDoc)
    }, [trigger]);

    return(<>
    <form onSubmit={
      (e)=>{
        e.preventDefault()
        submitFunc(formData)
        
      }}>
    <div className =  "absolute w-[600px] py-6 bg-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl z-50">
    <div className = "absolute right-[0] top-[0]">
      <CloseIcon style={{cursor:"pointer"}}onClick = {()=>{
        setButton(0)
      }}/>
    </div>
    
      <div className="flex items-center font-bold px-4 my-2">
          <div className="w-[100px]">Тип</div>
          <select  onChange={(e)=>{
          setDocumentType(e.target.value)
            }} className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10">
            <option value="car">За кола</option>
            <option value="person">За инструктор</option>
          </select>
      </div>

      {rows.map((row:string,key:number)=>(
        <div className="flex items-center font-bold px-4 my-2">
          <div className="w-[100px]">{row}</div>
          <input className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{handleChange(jsonFields[key],e.target.value)}} />
        </div>

      ))}
      
        <div>
          {documentType == "car" ?
            <div className="flex items-center font-bold px-4 my-2">
              <div className="w-[100px]">Притежател</div>
              <select className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{handleChange("relatedTo",e.target.value)}}>
              <option>Изберете кола</option>
                {cars?.map((car:any)=>(
                  <option value={car._id}>{car._id}</option>
                ))}
            </select>
          </div>
          :<></>}
          {documentType == "person" ?
            <div className="flex items-center font-bold px-4 my-2">
              <div className="w-[100px]">Притежател</div>
              <select className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{handleChange("relatedTo",e.target.value)}}>
                <option>Изберете инструктор</option>
                {instructors?.map((instructor:any)=>(
                  <option value={instructor.id} >{instructor.firstName} {instructor.lastName}</option>
                ))}
            </select>
          </div>
          :<></>}
          </div>
          <div className="flex items-center font-bold mb-4 px-4">
        <input className="h-[40px] w-full border border-gray-300 rounded-lg px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" onChange = {(e)=>{
          handleChange(jsonFields[jsonFields.length-1],e.target.value)
        }}/> 
      </div>
      <div className = "flex justify-center font-bold">
        <button type = "submit" className="w-[50%] h-[40px] bg-sky-500  mt-4 flex justify-center items-center rounded-xl border-2 border-black">Запиши</button>
      </div>
    </div>
    </form>
    </>)
}
export default FormDocuments