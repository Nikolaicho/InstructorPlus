import { useEffect,useState } from "react"
import { Document } from "../../interfaces/documents.interface";
const useGetAllDocuments = () =>{
    const [isDocumentsLoaded,setIsDocumentsLoaded] = useState<boolean>()
    const [documents,setDocuments] = useState<Document[]>();
    useEffect(()=>{
        async function getAllDocuments(){
        const response = await fetch("http://localhost:8000/getAllDocuments",{
            method:"GET",
            credentials:"include"
        })
        
        setDocuments(await response.json())
        setIsDocumentsLoaded(true)
    }
    getAllDocuments();
    },[])
    return {isDocumentsLoaded,documents}
}
export default useGetAllDocuments