import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

interface formProps {
    title:string
    inputs:Array<any>;
    submitFunc:(data:any)=>Promise<UserInfo>;
    jsonFields:Array<string>;
    destination:string
}

interface UserInfo {
    role: string;
    id: string;
  }

const Form:React.FC<formProps> = ({title,inputs,submitFunc,jsonFields}) => {
    const [formData,setFormData] = useState<any>({})
    const navigate = useNavigate();
    const handleChange = ( value: string,field:string) => {
        let updatedData = formData
        updatedData[field] = value; 
        setFormData(updatedData);
    };

    return(<>
    <form onSubmit = {
        (e)=>{
            e.preventDefault()
            const awaitFunction = async () =>{
                let userInfo = await submitFunc(formData);
                
                if(userInfo.role == "user"){
                    navigate("/classes/"+userInfo.id)
                }
                else if(userInfo.role == "admin"){
                    navigate("/assignClasses")
                }
                else if(userInfo.role == "superAdmin"){
                    navigate("/documents")
                }
                else{
                    navigate("/logIn")
                }
            }
            awaitFunction()
        }}>
        <div className="container h-screen w-screen bg-sky-600">
            <div className="flex flex-col w-[25%] bg-white rounded-xl border-2 border-black font-bold relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-center pb-2 pt-4">{title}</p>
                {inputs.map((input:string,key:number)=>(
                    <Input className = "scale-90 pb-4" label={input}  onChange={(e) => handleChange(e.target.value,jsonFields[key])} size="sm"/>
                ))}
                
                <Button type = "submit" className="scale-90 py-7 text-xl font-bold bg-sky-500 border-2 border-black" >{title}</Button>
                <br/>
            </div> 
        </div>
    </form>
    
    </>)
}
 

export default Form