import { useEffect, useState } from "react"


const useTodayClasses = () => {
    
    const getClasses = async (date:Date) =>{
        let result = await fetch("http://localhost:8000/getAllClasses",{
            method:"POST",
            body:JSON.stringify({
                searchedDate:date
            }),
            headers: {
                "Content-Type": "application/json",
              },
            credentials:"include"
        })
        return await result.json()
    }
    return {getClasses}
}
export default useTodayClasses