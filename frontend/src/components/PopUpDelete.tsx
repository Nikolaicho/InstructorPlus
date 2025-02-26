import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors";
import useGetAllCars from "../hooks/Documents/useGetAllCars";
import CloseIcon from '@mui/icons-material/Close';
import { button } from "@nextui-org/react";
import { useState } from "react";

interface FormDocumentsProps {
    type:string 
    submitFunc: (data:any) => void;
    jsonFields: Array<string>,
    setButton: React.Dispatch<React.SetStateAction<number>>;
}

const PopUpDelete: React.FC<FormDocumentsProps> = ({type,submitFunc,jsonFields,setButton}) => {
    const {instructors} = useGetAllInstructors()
    const {cars} = useGetAllCars()
    const [formData,setFormData] = useState<any>({})

    const handleChange = (field: string, value: string) => {
        const updatedData = formData;
        updatedData[field] = value; 
        setFormData(updatedData);
      };

    return(<>
    <div className =  "absolute w-[600px] py-6 bg-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl z-50">
        <div className = "absolute right-[0] top-[0]">
            <CloseIcon style={{cursor:"pointer"}}onClick = {()=>{
                setButton(0)
            }}/>
        </div>

        <form onSubmit={
        (e)=>{
        e.preventDefault()
        submitFunc(formData)
        
      }}></form>
        {type == "car"?
        <>
            <div className = "text-center mb-4 font-bold">Премахни кола</div>
            <div className="flex justify-center">
                <div className="w-[30%] text-center">Номер на колата</div>
                
                <select className="h-[30px] w-[50%] text-center border border-gray-300 rounded-md px-2 ml-[auto] mr-[auto] " onChange={(e)=>{handleChange("register",e.target.value)}}>
                
                    {cars?.map((car:any)=>(
                        <option value={car._id}>{car._id}</option>
                    ))}
                </select>
            </div>
        </>
        :
        <div>
            <div className = "text-center mb-4 font-bold">Премахни инструктор</div>
            <div className="flex justify-center">
                <div className="w-[30%] text-center">Име на инструктор:</div>
                <select className="h-[30px] w-[50%] flex-1 border border-gray-300 rounded-md px-2 ">
                    <option>Изберете инструктор</option>
                    {instructors?.map((instructor:any)=>(
                        <option value={instructor.id} >{instructor.firstName} {instructor.lastName}</option>
                    ))}
                </select>
            </div>
        </div>}
        <div className = "flex justify-center font-bold">
                    <button type = "submit" className="w-[50%] h-[40px] bg-sky-500  mt-4 flex justify-center items-center rounded-xl border-2 border-black">Запиши</button>
                </div>
    </div>
    </>)

}
export default PopUpDelete