import { useEffect, useState } from "react";
interface formattedRequest{
    requestId:string,
    userId:string,
    fisrtName:string,
    lastName:string,
}
const  useGetAllRequests = () => {
    const [requests,setRequests] = useState<formattedRequest[]>([])
    const getAllRequests = async () => {
        let result = await fetch(`http://localhost:8000/getAllRequests`,{
            method:"GET",
            credentials:"include"
        })
        
        setRequests(await(result.json()))
    }
    useEffect(()=>{
        getAllRequests()
    },[])
    return {requests,setRequests}
}
export default useGetAllRequests