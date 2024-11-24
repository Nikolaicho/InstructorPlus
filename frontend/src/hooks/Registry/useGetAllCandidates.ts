import { useEffect, useState } from "react"
interface candidateInfo{
    firstName:string,
    surname:string,
    lastName:string,
    _id:string,
  }
function useGetAllCandidates(){
    const [userInfo,setUserInfo] = useState<candidateInfo[]>()
    const [isInfoLoaded,setIsInfoLoaded] = useState<boolean>(false)
    async function getAllCandidates(){
        let response = await fetch("http://localhost:8000/getAllAvailableCandidates",{
            method:"GET"
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