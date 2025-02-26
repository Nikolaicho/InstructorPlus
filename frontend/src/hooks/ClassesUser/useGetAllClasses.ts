import { useEffect, useState } from "react"

const useGetAllClasses = (id:string|undefined) => {
    let params:URLSearchParams;
    if(id != undefined){
        params = new URLSearchParams({
            id: id,
        });
    }
    const [classes,setClasses] = useState<any>()
    const getAllClasses = async() => {
        let result = await fetch("http://localhost:8000/getAllClassesUser?"+params,{
            method:"GET",
            credentials:"include",
        })
        setClasses(await result.json())
    }
    useEffect(()=>{
        getAllClasses()
    },[])
    return {classes}
}
export default useGetAllClasses