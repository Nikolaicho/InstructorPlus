import { useEffect, useState } from "react";
const useGetAllInstructors = () =>{
    const [instructors,setInstructors] = useState<any>()
    useEffect(()=>{
        async function getAllInstructors(){
          const response = await fetch("http://localhost:8000/getAllInstructors",{
            method:"GET"
          })
          setInstructors(await response.json())
        }
        
        getAllInstructors();
    },[])
    return {instructors}
}
export default useGetAllInstructors