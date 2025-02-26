import {useState} from "react"

const useClass = ()=>{
    let date = new Date()
    const [selectedDate, setSelectedDate] = useState(new Date(date.getFullYear(),date.getMonth(),date.getDate(),0));
    const [classId,setClassId] = useState<string>("")
    const signNewClass = async (id:string,date:Date,hours:number|undefined,minutes:number|undefined,longHour:string)=>{
        
        const response = await fetch("http://localhost:8000/signNewClass",{
            method:"POST",
            body:JSON.stringify({
                date:date,
                id:id,
                hours:hours,
                minutes:minutes,
                longHour:longHour
            }),
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(await (response.json()))
        setClassId(await (response.json()))
    }
    
    return {setSelectedDate, selectedDate,signNewClass}
}
export default useClass 