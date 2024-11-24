import { useEffect, useState } from "react"

interface userInfo {
    firstName:String,
    surname:String,
    lastName:String,
}
function useGetCandidateInfo(id:string|undefined){
    const [userInfo,setUserInfo] = useState<any>()
    const [transactions,setTransactions] = useState<any>()
    const [isLoaded,setIsLoaded] = useState<boolean>()
    async function getInfo(){
        
        const response = await fetch("http://localhost:8000/getUserInfo",{
            method:"POST",
            body:JSON.stringify(
                {
                    id:id,
                }
            ),
            headers:{
                "Content-Type":"application/json"
            },
        })
        //console.log(await(response.json()))
        setUserInfo(await(response.json()))
        setIsLoaded(true)
    }

    useEffect(()=>{
        getInfo()
    })
    return {userInfo,isLoaded}
}
export default useGetCandidateInfo