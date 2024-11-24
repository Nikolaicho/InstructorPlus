import {useEffect, useState} from "react"

const useCandidates = () => {
    const [availableCandidates, setAvailableCandidates] = useState<string[]>();

    async function getCandidates() {
      const response = await fetch("http://localhost:8000/getAllAvailableCandidates ", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      setAvailableCandidates((await response.json()).allCandidates)
    }

    useEffect(()=>{
      getCandidates()
    },[])
    
    return {availableCandidates};
}

export default useCandidates;