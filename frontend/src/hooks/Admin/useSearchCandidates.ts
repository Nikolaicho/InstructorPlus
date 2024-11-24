import {useState} from "react"
const useSearchCandidate = () =>{
    const [candidates,setCandidates] = useState<any>()
    const [isCandidatesLoaded,setIsCandidatesLoaded] = useState<boolean>()
    const searchCandidates = async (name:string) =>{
        let response = await fetch("http://localhost:8000/searchCandidates",{
            method:"POST",
            body:JSON.stringify({
                name:name
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        //console.log(await (response.json()))
        setCandidates(await (response.json()))
        setIsCandidatesLoaded(true)
    }
    
    return {searchCandidates,candidates,isCandidatesLoaded}
}
export default useSearchCandidate