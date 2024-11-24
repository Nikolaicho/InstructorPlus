import {useState} from "react";
const useAddCar = () => {
    const [errorMessage,setErrorMessage] = useState()
    const addCar = async (brand:string,model:string,registration:string) =>{
        const response = await fetch("http://localhost:8000/addCar",{
            method:"POST",
            body:JSON.stringify({
                brand:brand,
                model:model,
                registration:registration,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include"
        })
        setErrorMessage((await response.json()).message)
    }
   
    return {addCar,errorMessage}
}
export default useAddCar