import { useEffect, useState } from "react"
import { Car } from "../../interfaces/documents.interface"
const useGetAllCars = () =>{
    const [cars,setCars] = useState<Car[]>()

    const getAllCars = async () =>{
        const response = await fetch("http://localhost:8000/getAllCars",{
            method:"GET"
        })
        setCars(await response.json())
        
    }
    useEffect(()=>{
        
        getAllCars()
        
    },[])
    return {cars}
}
export default useGetAllCars