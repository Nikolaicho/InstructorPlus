import {useState} from "react"

const useClass = ()=>{
    let date = new Date()
    const [selectedDate, setSelectedDate] = useState(new Date(date.getFullYear(),date.getMonth(),date.getDate(),0));
    const signNewClass = async (id:string,date:Date,hours:number,minutes:number,longHour:string)=>{
        
        fetch("http://localhost:8000/signNewClass",{
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
    }
    
    return {setSelectedDate, selectedDate,signNewClass}
}
export default useClass 