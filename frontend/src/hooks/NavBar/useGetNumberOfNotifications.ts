import { useEffect, useState } from "react"

const useGetNumberOfNotifications = () =>{
    const [number,setNumber] = useState<number>()
    useEffect(()=>{
        const awaitFetch = async () => {
            const response = await fetch("http://localhost:8000/getNotifications",{
                method:"GET",
                credentials:"include"
            })
            setNumber((await response.json()).length)
        }
        awaitFetch();
    },[])
    return {number}
}
export default useGetNumberOfNotifications