import { useEffect } from "react"

const useGetAllExams = (id:string|undefined) => {
    
    const baseUrl = "http://localhost:8000/getAllExams"
    let params:URLSearchParams;
    if(id !=undefined){
        params = new URLSearchParams({
            candidateId: id,
        });
    }
    
    const getAllExams = async() => {
        const result = await fetch(`${baseUrl}?${params}`,{
            method:"GET",
            credentials:"include"
        })
    }
    useEffect(()=>{
        getAllExams()
    },[])
}
export default useGetAllExams