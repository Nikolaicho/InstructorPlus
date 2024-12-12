import { useEffect, useState } from "react"
import { Candidate } from "../../interfaces/candidate.interface"
function useGetAllCandidates(){
    const [userInfo,setUserInfo] = useState<Candidate[]>()
    const [isInfoLoaded,setIsInfoLoaded] = useState<boolean>(false)
    async function getAllCandidates(){
        
        let response = await fetch(`http://localhost:8000/getAllAvailableCandidates`,{
            method:"GET",
            credentials:"include"
        })
        setUserInfo(await (response.json()))
    }
    useEffect(()=>{
        getAllCandidates()
        setIsInfoLoaded(true)
    })
    return {userInfo,isInfoLoaded}
    
}
export default  useGetAllCandidates;