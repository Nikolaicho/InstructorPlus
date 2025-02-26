import {useState} from "react"
import { Candidate } from "../../interfaces/candidate.interface"
const useSearchCandidate = () =>{
    const [candidates,setCandidates] = useState<Candidate[]>()
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
        
        setCandidates(await (response.json()))
    }
    
    return {searchCandidates,candidates}
}
export default useSearchCandidate