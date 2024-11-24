import { useEffect, useState } from "react"

const useGetAllCars = () =>{
    const [cars,setCars] = useState<any>()

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