import { useEffect,useState } from "react"

const useGetAllDocuments = () =>{
    const [isDocumentsLoaded,setIsDocumentsLoaded] = useState<boolean>()
    const [documents,setDocuments] = useState<any>();
    useEffect(()=>{
        async function getAllDocuments(){
        const response = await fetch("http://localhost:8000/getAllDocuments",{
            method:"GET"
        })
        setDocuments(await response.json())
        setIsDocumentsLoaded(true)
    }
    getAllDocuments();
    },[])
    return {isDocumentsLoaded,documents}
}
export default useGetAllDocuments