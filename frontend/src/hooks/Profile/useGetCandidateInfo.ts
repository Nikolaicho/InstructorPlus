import { useEffect, useState } from "react"
import { profileInfo } from "../../interfaces/profile.interface"

function useGetCandidateInfo(id:string|undefined){
    const [userInfo,setUserInfo] = useState<profileInfo>()
    const [transactions,setTransactions] = useState<any>()

    let params:URLSearchParams;
        if(id !=undefined){
            params = new URLSearchParams({
                candidateId: id,
            });
        }
    let baseUrl = "http://localhost:8000/getUserProfileInfo/"

    async function getInfo(){
        
        const response = await fetch(`${baseUrl}?${params}`,{
            method:"GET",
            credentials:"include"
        })
        
        setUserInfo(await(response.json()))
    }

    useEffect(()=>{
        getInfo()
    },[])
    return {userInfo}
}
export default useGetCandidateInfo