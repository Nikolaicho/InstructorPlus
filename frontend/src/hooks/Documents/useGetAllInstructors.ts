import { useEffect, useState } from "react";
import { Instructor } from "../../interfaces/documents.interface";
const useGetAllInstructors = () =>{
    const [instructors,setInstructors] = useState<Instructor[]>()
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