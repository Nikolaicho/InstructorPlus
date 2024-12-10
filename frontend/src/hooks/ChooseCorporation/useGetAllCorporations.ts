import { useEffect, useState } from "react"
import {Corporation} from "../../interfaces/corporation.interface"
const useGetAllCorporations = () =>{
    const [corporations,setCorporations] = useState<Corporation[]>()
    const getAllCorporations = async () =>{
        let response = await fetch("http://localhost:8000/getAllCorporations",{
            method:"GET",
            credentials:"include",
        })
        setCorporations(await(response.json()))
    }
    useEffect(()=>{
        getAllCorporations()
    },[])   
    return{corporations}
}
export default useGetAllCorporations