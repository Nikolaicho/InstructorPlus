import { useState } from "react";
import useSignNewExam from "../hooks/Profile/useSignNewExam";
import CloseIcon from '@mui/icons-material/Close';

interface ExamsPopUpProps{
    id:string|undefined
    setButton: React.Dispatch<React.SetStateAction<number>>;
}

const ExamsPopUp:React.FC<ExamsPopUpProps> = ({id,setButton}) => {
    const {signNewExam} = useSignNewExam(id);
    const [date,setDate] = useState<string>("")
    const [type,setType] = useState<string>("theoretical")
    const [result,setResult] = useState<string>("yes")
    const [dateError,setDateError] = useState<boolean>(false)
    
    return(<>
    
     <div className =  "absolute w-[600px] py-6 bg-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl z-50">
        <div className = "absolute right-[0] top-[0]">
            <CloseIcon onClick = {()=>{
                setButton(0)
            }}/>
        </div>
        <form onSubmit = {(e) =>{
            e.preventDefault()
            if(date == ""){
                setDateError(true)
            }
            else{
                signNewExam(result,type,date)
            }
            
        } }>
            <div className="flex items-center font-bold px-4 my-2">
                <div className="w-[100px]">Тип изпит:</div>
                <select className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{setType(e.target.value)}} >
                    <option value="theoretical">Теоретичен</option>
                    <option value="practical">Практичен</option>
                </select>
            </div>
            <div className="flex items-center font-bold px-4 my-2">
                <div className="w-[100px]">Резултат:</div>
                <select className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{setResult(e.target.value)}} >
                    <option value="yes">Да</option>
                    <option value="no">Не</option>
                </select>
            </div>
            <div className="flex items-center font-bold px-4 my-2">
                <div className="w-[100px]">Дата:</div>
                <div className = "flex-col w-full">
                    <input type = "date" className = {dateError ?"h-[40px] border-2 border-red-600 w-full border border-gray-300 rounded-lg px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :"h-[40px] w-full border border-gray-300 rounded-lg px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                    onChange={(e)=>
                        { 
                            setDateError(false);
                            setDate(e.target.value)
                        }}/>
                    {dateError?<div className = "text-[10px] text-red-600 ">Въведете валидна дата</div>:<></>}
                </div>
            </div>

            <div className = "flex justify-center font-bold">
                <button type = "submit" className="w-[50%] h-[40px] bg-sky-500  mt-4 flex justify-center items-center rounded-xl border-2 border-black">Запиши</button>
            </div>
        </form>
    </div> 
    </>)
}
export default ExamsPopUp