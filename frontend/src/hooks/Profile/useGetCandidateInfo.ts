import { useEffect, useState } from "react"
import { profileInfo } from "../../interfaces/profile.interface"

function useGetCandidateInfo(id:string|undefined){
    const [userInfo,setUserInfo] = useState<profileInfo>()
    const [transactions,setTransactions] = useState<any>()
    const [isLoaded,setIsLoaded] = useState<boolean>()

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
           
            headers:{
                "Content-Type":"application/json"
            },
        })
        
        setUserInfo(await(response.json()))
        setIsLoaded(true)
    }

    useEffect(()=>{
        getInfo()
    })
    return {userInfo,isLoaded}
}
export default useGetCandidateInfo