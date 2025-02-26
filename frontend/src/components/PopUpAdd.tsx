import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


interface FormDocumentsProps {
    rows: string[]; 
    submitFunc: (data:any) => void;
    jsonFields: Array<string>,
    setButton: React.Dispatch<React.SetStateAction<number>>;
  }

const PopUpAdd: React.FC<FormDocumentsProps> = ({rows,submitFunc,jsonFields,setButton}) => {
    const [formData,setFormData] = useState<any>({})

    const handleChange = (field: string, value: string) => {
      const updatedData = formData;
      updatedData[field] = value; 
      setFormData(updatedData);
    };

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
    {rows.map((row:string,key:number)=>(
        <div className="flex items-center font-bold px-4 my-2">
          <div className="w-[100px]">{row}</div>
          <input className="h-[30px] flex-1 border border-gray-300 rounded-md px-2 ml-10" onChange={(e)=>{handleChange(jsonFields[key],e.target.value)}} />
        </div>

      ))}
      <div className = "flex justify-center font-bold">
        <button type = "submit" className="w-[50%] h-[40px] bg-sky-500  mt-4 flex justify-center items-center rounded-xl border-2 border-black">Запиши</button>
      </div>
    </div>
    </form>
    </>)
}
export default PopUpAdd